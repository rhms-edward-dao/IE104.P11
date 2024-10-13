"""Update mathang & daily

Revision ID: 524ac2d3fe45
Revises: c91a5bf0c2f5
Create Date: 2024-08-24 20:46:47.887810

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '524ac2d3fe45'
down_revision: Union[str, None] = 'c91a5bf0c2f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
