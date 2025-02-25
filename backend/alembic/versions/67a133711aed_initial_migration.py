"""Initial migration

Revision ID: 67a133711aed
Revises: 
Create Date: 2024-12-16 17:21:03.244241

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '67a133711aed'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('idx_baocaocongno_ngaylapbaocao', table_name='baocaocongno')
    op.create_index(op.f('ix_baocaocongno_ngaylapbaocao'), 'baocaocongno', ['ngaylapbaocao'], unique=False)
    op.drop_index('idx_baocaodoanhso_ngaylapbaocao', table_name='baocaodoanhso')
    op.create_index(op.f('ix_baocaodoanhso_ngaylapbaocao'), 'baocaodoanhso', ['ngaylapbaocao'], unique=False)
    op.drop_index('idx_thoidiembatdau', table_name='baotridaily')
    op.create_index(op.f('ix_baotridaily_thoidiembatdau'), 'baotridaily', ['thoidiembatdau'], unique=False)
    op.drop_index('idx_maphieunhap', table_name='chitiet_pnh')
    op.drop_index('idx_pctnh_mamathang', table_name='chitiet_pnh')
    op.create_index(op.f('ix_chitiet_pnh_mamathang'), 'chitiet_pnh', ['mamathang'], unique=False)
    op.create_index(op.f('ix_chitiet_pnh_maphieunhap'), 'chitiet_pnh', ['maphieunhap'], unique=False)
    op.drop_index('idx_ctpxh_mamathang', table_name='chitiet_pxh')
    op.drop_index('idx_maphieuxuat', table_name='chitiet_pxh')
    op.create_index(op.f('ix_chitiet_pxh_mamathang'), 'chitiet_pxh', ['mamathang'], unique=False)
    op.create_index(op.f('ix_chitiet_pxh_maphieuxuat'), 'chitiet_pxh', ['maphieuxuat'], unique=False)
    op.drop_index('idx_capdo', table_name='chucvu')
    op.drop_index('idx_luong', table_name='chucvu')
    op.drop_index('idx_tenchucvu', table_name='chucvu')
    op.create_index(op.f('ix_chucvu_capdo'), 'chucvu', ['capdo'], unique=False)
    op.create_index(op.f('ix_chucvu_luong'), 'chucvu', ['luong'], unique=False)
    op.drop_index('idx_daily_sodienthoai', table_name='daily')
    op.drop_index('idx_tendaily', table_name='daily')
    op.drop_index('idx_khachhang_sodienthoai', table_name='khachhang')
    op.drop_index('idx_tenloaidaily', table_name='loaidaily')
    op.drop_index('idx_loaimathang_tenloaimathang', table_name='loaimathang')
    op.drop_index('idx_tenmathang', table_name='mathang')
    op.drop_index('idx_email', table_name='nhanvien')
    op.drop_index('idx_nhanvien_sodienthoai', table_name='nhanvien')
    op.alter_column('phieunhaphang', 'tongtien',
               existing_type=sa.NUMERIC(precision=12, scale=4),
               nullable=False,
               existing_server_default=sa.text('0'))
    op.drop_index('idx_pnh_madaily', table_name='phieunhaphang')
    op.drop_index('idx_pnh_ngaylapphieu', table_name='phieunhaphang')
    op.create_index(op.f('ix_phieunhaphang_madaily'), 'phieunhaphang', ['madaily'], unique=False)
    op.create_index(op.f('ix_phieunhaphang_ngaylapphieu'), 'phieunhaphang', ['ngaylapphieu'], unique=False)
    op.alter_column('phieuxuathang', 'tongtien',
               existing_type=sa.NUMERIC(precision=12, scale=4),
               nullable=False,
               existing_server_default=sa.text('0'))
    op.drop_index('idx_pxh_madaily', table_name='phieuxuathang')
    op.drop_index('idx_pxh_ngaylapphieu', table_name='phieuxuathang')
    op.create_index(op.f('ix_phieuxuathang_madaily'), 'phieuxuathang', ['madaily'], unique=False)
    op.create_index(op.f('ix_phieuxuathang_ngaylapphieu'), 'phieuxuathang', ['ngaylapphieu'], unique=False)
    op.drop_index('idx_tenquan', table_name='quan')
    op.create_index(op.f('ix_quan_tenquan'), 'quan', ['tenquan'], unique=False)
    op.add_column('taikhoan', sa.Column('OTP', sa.String(length=4), nullable=True))
    op.drop_index('idx_tentaikhoan', table_name='taikhoan')
    op.drop_column('taikhoan', 'otp')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('taikhoan', sa.Column('otp', sa.VARCHAR(length=4), autoincrement=False, nullable=True))
    op.create_index('idx_tentaikhoan', 'taikhoan', ['tentaikhoan'], unique=False)
    op.drop_column('taikhoan', 'OTP')
    op.drop_index(op.f('ix_quan_tenquan'), table_name='quan')
    op.create_index('idx_tenquan', 'quan', ['tenquan'], unique=False)
    op.drop_index(op.f('ix_phieuxuathang_ngaylapphieu'), table_name='phieuxuathang')
    op.drop_index(op.f('ix_phieuxuathang_madaily'), table_name='phieuxuathang')
    op.create_index('idx_pxh_ngaylapphieu', 'phieuxuathang', ['ngaylapphieu'], unique=False)
    op.create_index('idx_pxh_madaily', 'phieuxuathang', ['madaily'], unique=False)
    op.alter_column('phieuxuathang', 'tongtien',
               existing_type=sa.NUMERIC(precision=12, scale=4),
               nullable=True,
               existing_server_default=sa.text('0'))
    op.drop_index(op.f('ix_phieunhaphang_ngaylapphieu'), table_name='phieunhaphang')
    op.drop_index(op.f('ix_phieunhaphang_madaily'), table_name='phieunhaphang')
    op.create_index('idx_pnh_ngaylapphieu', 'phieunhaphang', ['ngaylapphieu'], unique=False)
    op.create_index('idx_pnh_madaily', 'phieunhaphang', ['madaily'], unique=False)
    op.alter_column('phieunhaphang', 'tongtien',
               existing_type=sa.NUMERIC(precision=12, scale=4),
               nullable=True,
               existing_server_default=sa.text('0'))
    op.create_index('idx_nhanvien_sodienthoai', 'nhanvien', ['sodienthoai'], unique=False)
    op.create_index('idx_email', 'nhanvien', ['email'], unique=False)
    op.create_index('idx_tenmathang', 'mathang', ['tenmathang'], unique=False)
    op.create_index('idx_loaimathang_tenloaimathang', 'loaimathang', ['tenloaimathang'], unique=False)
    op.create_index('idx_tenloaidaily', 'loaidaily', ['tenloaidaily'], unique=False)
    op.create_index('idx_khachhang_sodienthoai', 'khachhang', ['sodienthoai'], unique=False)
    op.create_index('idx_tendaily', 'daily', ['tendaily'], unique=False)
    op.create_index('idx_daily_sodienthoai', 'daily', ['sodienthoai'], unique=False)
    op.drop_index(op.f('ix_chucvu_luong'), table_name='chucvu')
    op.drop_index(op.f('ix_chucvu_capdo'), table_name='chucvu')
    op.create_index('idx_tenchucvu', 'chucvu', ['tenchucvu'], unique=False)
    op.create_index('idx_luong', 'chucvu', ['luong'], unique=False)
    op.create_index('idx_capdo', 'chucvu', ['capdo'], unique=False)
    op.drop_index(op.f('ix_chitiet_pxh_maphieuxuat'), table_name='chitiet_pxh')
    op.drop_index(op.f('ix_chitiet_pxh_mamathang'), table_name='chitiet_pxh')
    op.create_index('idx_maphieuxuat', 'chitiet_pxh', ['maphieuxuat'], unique=False)
    op.create_index('idx_ctpxh_mamathang', 'chitiet_pxh', ['mamathang'], unique=False)
    op.drop_index(op.f('ix_chitiet_pnh_maphieunhap'), table_name='chitiet_pnh')
    op.drop_index(op.f('ix_chitiet_pnh_mamathang'), table_name='chitiet_pnh')
    op.create_index('idx_pctnh_mamathang', 'chitiet_pnh', ['mamathang'], unique=False)
    op.create_index('idx_maphieunhap', 'chitiet_pnh', ['maphieunhap'], unique=False)
    op.drop_index(op.f('ix_baotridaily_thoidiembatdau'), table_name='baotridaily')
    op.create_index('idx_thoidiembatdau', 'baotridaily', ['thoidiembatdau'], unique=False)
    op.drop_index(op.f('ix_baocaodoanhso_ngaylapbaocao'), table_name='baocaodoanhso')
    op.create_index('idx_baocaodoanhso_ngaylapbaocao', 'baocaodoanhso', ['ngaylapbaocao'], unique=False)
    op.drop_index(op.f('ix_baocaocongno_ngaylapbaocao'), table_name='baocaocongno')
    op.create_index('idx_baocaocongno_ngaylapbaocao', 'baocaocongno', ['ngaylapbaocao'], unique=False)
    # ### end Alembic commands ###
