"""Update MATHANG & DAILY

Revision ID: c91a5bf0c2f5
Revises: fccd56e92772
Create Date: 2024-08-24 17:09:15.476710

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c91a5bf0c2f5'
down_revision: Union[str, None] = 'fccd56e92772'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
