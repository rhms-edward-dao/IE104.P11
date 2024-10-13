"""Alter table MATHANG + DAILY

Revision ID: fccd56e92772
Revises: 350310596e9b
Create Date: 2024-08-24 15:55:11.988893

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fccd56e92772'
down_revision: Union[str, None] = '350310596e9b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
