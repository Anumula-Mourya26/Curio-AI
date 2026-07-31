"""
Observer Module.

Analyzes an uploaded CSV dataset and produces an ObservationReport.

Responsibilities:
  - Profile each column (dtype, nulls, numeric summaries, outliers)
  - Compute dataset-level statistics (duplicates, correlations)
  - Flag basic data quality signals for downstream modules

Input:  pandas DataFrame
Output: ObservationReport (app.models.observation)

This module does NOT identify what's "interesting" — that is the
Curiosity Engine's job. The Observer only describes what IS in the data.
"""

import numpy as np
import pandas as pd
from pydantic import BaseModel, Field

from app.models.observation import ColumnProfile, ObservationReport


class NumericSummary(BaseModel):
    mean: float | None = None
    median: float | None = None
    std: float | None = None
    min: float | None = None
    max: float | None = None


class ObserverColumnProfile(ColumnProfile):
    missing_count: int = 0
    numeric_summary: NumericSummary | None = None
    outlier_count: int = 0
    outlier_indices: list[int] = Field(default_factory=list)


class ObserverReport(ObservationReport):
    duplicate_row_count: int = 0
    correlation_matrix: dict[str, dict[str, float]] = Field(default_factory=dict)
    columns: list[ObserverColumnProfile]


class Observer:
    """Analyzes structured datasets and produces observation reports."""

    def analyze(self, dataset: pd.DataFrame, session_id: str) -> ObservationReport:
        df = dataset.copy()
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        profiles = [self._profile_column(df, col) for col in df.columns]

        return ObserverReport(
            session_id=session_id,
            row_count=len(df),
            column_count=len(df.columns),
            columns=profiles,
            duplicate_row_count=int(df.duplicated().sum()),
            correlation_matrix=self._correlation_matrix(df, numeric_cols),
        )

    def _profile_column(self, df: pd.DataFrame, column: str) -> ObserverColumnProfile:
        series = df[column]
        missing_count = int(series.isna().sum())
        numeric_summary = None
        outlier_indices: list[int] = []

        if pd.api.types.is_numeric_dtype(series):
            numeric_summary = self._numeric_summary(series)
            outlier_indices = self._iqr_outliers(series)

        return ObserverColumnProfile(
            name=str(column),
            dtype=str(series.dtype),
            missing_count=missing_count,
            numeric_summary=numeric_summary,
            outlier_count=len(outlier_indices),
            outlier_indices=outlier_indices,
        )

    def _numeric_summary(self, series: pd.Series) -> NumericSummary | None:
        clean = series.dropna()
        if clean.empty:
            return None

        std = float(clean.std()) if len(clean) > 1 else 0.0
        if np.isnan(std):
            std = 0.0

        return NumericSummary(
            mean=float(clean.mean()),
            median=float(clean.median()),
            std=std,
            min=float(clean.min()),
            max=float(clean.max()),
        )

    def _iqr_outliers(self, series: pd.Series) -> list[int]:
        clean = series.dropna()
        if len(clean) < 4:
            return []

        q1, q3 = clean.quantile(0.25), clean.quantile(0.75)
        iqr = q3 - q1
        if iqr == 0:
            return []

        lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr
        mask = series.notna() & ((series < lower) | (series > upper))
        return [int(i) for i in series.index[mask]]

    def _correlation_matrix(
        self, df: pd.DataFrame, numeric_cols: list[str]
    ) -> dict[str, dict[str, float]]:
        if len(numeric_cols) < 2:
            return {}

        corr = df[numeric_cols].corr()
        matrix: dict[str, dict[str, float]] = {}
        for col in numeric_cols:
            matrix[col] = {}
            for other in numeric_cols:
                value = corr.loc[col, other]
                matrix[col][other] = float(value) if pd.notna(value) else 0.0
        return matrix
