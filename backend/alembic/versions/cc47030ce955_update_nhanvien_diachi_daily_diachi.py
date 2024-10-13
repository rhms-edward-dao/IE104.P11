"""UPDATE NHANVIEN_DIACHI & DAILY_DIACHI

Revision ID: cc47030ce955
Revises: afc2809af9f9
Create Date: 2024-09-04 11:27:01.252637

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cc47030ce955'
down_revision: Union[str, None] = 'afc2809af9f9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
