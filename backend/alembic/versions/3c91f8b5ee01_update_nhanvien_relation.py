"""Update NHANVIEN relation

Revision ID: 3c91f8b5ee01
Revises: 524ac2d3fe45
Create Date: 2024-08-29 14:20:13.458062

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3c91f8b5ee01'
down_revision: Union[str, None] = '524ac2d3fe45'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
