-- Create table LOAIDAILY
create table LOAIDAILY (
	MaLoaiDaiLy smallserial, -- Primary key, unique identifier for each record
	TenLoaiDaiLy character varying(100) unique not null, -- Name of category of store
	SoTienNoToiDa decimal(12,4) default 0, -- A Store's debt cannot bigger than this amount (in the same category), constraint 'SoTienNoToiDa >= 0' will be checked in frontend
	constraint pk_loaidaily primary key(MaLoaiDaiLy)
);

-- Create table DAILY
create table DAILY (
	MaDaiLy smallserial, -- Primary key, unique identifier for each record
	MaLoaiDaiLy smallint not null, -- Foreign key to MaLoaiDaiLy Table
	TenDaiLy character varying(100) unique not null , -- Name of the store -- check (TenDaiLy ~* '^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$') should do in frontend
	SoDienThoai character varying(20) unique not null, -- Store's phone number
	NgayTiepNhan date default current_date, -- The date the store was registerd, just date and not included time
	SoTienNo decimal(12, 4) default 0, -- A mount of deb for each store, constraint 'SoTienNo >= 0' will be checked in frontend
	HinhAnh character varying(200), -- used for store link of images
	constraint pk_daily primary key(MaDaiLy),
	constraint fk_daily_to_loaidaily foreign key(MaLoaiDaiLy) references LOAIDAILY(MaLoaiDaiLy) on delete set null
);

-- Crreate table LOAIMATHANG
create table LOAIMATHANG (
	MaLoaiMatHang smallserial, -- Unique Identifier for each record
	TenLoaiMatHang varchar(100) unique not null,
	constraint pk_loaimathang primary key(MaLoaiMatHang)
);

-- Create table MATHANG
create table MATHANG (
	MaMatHang smallserial, -- Primary key, unique identifier for each record
	TenMatHang character varying(100) unique not null, -- check (TenMatHang ~* '^[A-Za-z]+(?:\s[A-Za-z]+)*$') should do in frontend
	SoLuongTon int default 0, -- Amount left of product in store , constraint 'SoLuongTon >= 0' will be checked in frontend
	Dongia decimal(12, 4) not null,
	TenDVT character varying(50) not null, -- This field must be checked before being inserted
	HinhAnh character varying(100),
	MaDaiLy smallint not null,
	MaLoaiMatHang smallint not null,
	constraint pk_mathang primary key(MaMatHang),
	constraint fk_mathang_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint fk_mathanG_to_loaimathang foreign key(MaLoaiMatHang) references LOAIMATHANG(MaLoaiMatHang) on delete cascade
);

-- Create table NHANVIEN
create table NHANVIEN (
	MaNhanVien smallserial, -- Primary key, unique identifier for each record
	MaDaiLy smallint not null, -- Foreign key that referenced to DAILY table
	HoTen character varying(100) not null , -- check (HoTen ~* '^[A-Za-z]+(?:\s[A-Za-z]+)*$')
	NgaySinh date default current_date, -- Age of staff must bigger than 18 (because wwe dont need to hire a smaller 18 years old young boy)
	SoDienThoai character varying(20) unique not null,
	Email character varying(100) unique not null,  -- Used company's email
	Hinhanh character varying(200) default null,
	constraint pk_nhanvien primary key(MaNhanVien),
	constraint fk_nhanvien_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete set null
);

-- Create table CHUCVU
create table CHUCVU (
	MaChucVu smallserial, -- Primary key
	TenChucVu character varying(100) unique not null,
	NgayTao date default current_date,
	NgayCapNhat date default current_date,
	CapDo smallint default 0,
	Luong decimal(12, 4) default 3000000 check(Luong >= 3000000),
	constraint pk_chucvu primary key(MaChucVu),
	constraint ck_ngaytao_ngaycapnhat check(NgayCapNhat >= NgayTao)
);

-- create table NHANVIEN_CHUCVU
create table NHANVIEN_CHUCVU (
	MaNhanVien smallint not null,
	MaChucVu smallint not null,
	NgayBatDau date default current_date,	
	ThoiHan decimal(12, 4) default 1 check(ThoiHan >= 0),
	constraint pk_nhanvien_chucvu primary key(MaNhanVien, MaChucVu, NgayBatdau), -- NgayBatDau must be included in primary key pair because one staff can be assigned in one position for multiple time
	constraint fk_nhanvien_chucvu_to_nhanvien foreign key(MaNhanVien) references NHANVIEN(MaNhanVien) on delete cascade,
	constraint fk_nhanvien_chucv_to_chucvu foreign key(MaChucVu) references CHUCVU(MaChucVu) -- can not delete chucvu in this case
);

-- Create table TAIKHOAN
create table TAIKHOAN (
	MaTaiKhoan smallserial,
	TenTaiKhoan character varying(100) unique not null,
	MatKhau character varying(200) not null,
	isActivated bool default FALSE,
	constraint pk_taikhoan primary key(MaTaiKhoan)
);

-- Create table TAIKHOAN_NHANVIEN
create table TAIKHOAN_NHAVIEN (
	MaNhanVien smallint not null,
	MaTaiKhoan smallint not null,
	constraint pk_taikhoan_nhanvien primary key(MaNhanVien, MaTaiKhoan),
	constraint fk_taikhoan_nhanvien_to_nhanvien foreign key(MaNhanVien) references NHANVIEN(MaNhanVien) on delete cascade,
	constraint fk_taikhoan_nhanvien_to_taikhoan foreign key(MaTaiKhoan) references TAIKHOAN(MaTaiKhoan) on delete cascade
);

-- Create table KHACHHANG
create table KHACHHANG (
	MaKhachHang smallserial, -- Unique Identifier for each record
	TenKhachHang varchar(100) not null,
	SoDienThoai varchar(20) unique not null,
	constraint pk_khachhang primary key(MaKhachHang)
);

-- Create table QUAN
create table QUAN (
	MaQuan smallserial, -- Primary key, unique identifier for each record
	TenQuan character varying(100) not null, -- Name of district
	TenThanhPho	character varying(100) not null, -- Name of city
	constraint pk_quan primary key (MaQuan)
);

-- create table DAILY_DIACHI
create table DAILY_DIACHI (
	MaDaiLy smallint not null,
	MaQuan smallint not null,
	DiaChi character varying(200) unique not null,
	KinhDo varchar(15) not null,
	ViDo varchar(15) not null,
	constraint pk_daily_diachi primary key(MaDaiLy, MaQuan),
	constraint fk_daily_diachi_to_nhanvien foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint fk_daily_diachi_to_quan foreign key(MaQuan) references QUAN(MaQuan) on delete cascade
);

-- create table NHANVIEN_DIACHI
create table NHANVIEN_DIACHI (
	MaNhanVien smallint not null,
	MaQuan smallint not null,
	DiaChi character varying(200) not null,
	KinhDo varchar(15) not null,
	ViDo varchar(15) not null,
	constraint pk_nhanvien_diachi primary key(MaNhanVien, MaQuan),
	constraint fk_nhanvien_diachi_to_nhanvien foreign key(MaNhanVien) references NHANVIEN(MaNhanVien) on delete cascade,
	constraint fk_nhanvien_diachi_to_quan foreign key(MaQuan) references QUAN(MaQuan) -- cannot delete quan in this case
);

-- Create table KHACHHANG_DIACHI
create table KHACHHANG_DIACHI (
	MaKhachHang smallint not null,
	MaQuan smallint not null,
	DiaChi varchar(200) not null,
	constraint pk_khachhang_diachi primary key(MaKhachHang, MaQuan),
	constraint fk_khachhang_diachi_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade,
	constraint fk_khachhang_diachi_to_quan foreign key(MaQuan) references QUAN(MaQuan)
);

-- Create table PHIEUNHAPHANG
create table PHIEUNHAPHANG (
	MaPhieuNhap smallserial, -- Primary key, unique identifier for each record
	MaDaiLy smallint not null,
	NgayLapPhieu date default current_date, -- This date must be happened after NgayTiepNhan
	TongTien decimal(12, 4) default 0, -- constraint '(TongTien >= 0)' will be checked in frontend
	TienDaThanhToan decimal(12, 4) default 0,
	TinhTrang varchar(50) default 'Còn nợ',
	constraint pk_phieunhaphang primary key(MaPhieuNhap),
	constraint fk_phieunhaphang_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade
);

-- Create table CHITIET_PNH
create table CHITIET_PNH (
	MaCT_PNH serial, -- Primary key
	MaPhieuNhap smallint not null,
	MaMatHang smallint not null,
	SoLuongNhap int default 0, -- constraint 'SoLuongNhap >= 0' will be checked in frontend
	DonGiaNhap decimal(12, 4) not null, -- constraint 'DonGiaNhap >= 0' will be checked in frontend	
	constraint pk_chitiet_pnh primary key(MaCT_PNH),
	constraint fk_chitiet_pnh_to_phieunhaphang foreign key(MaPhieuNhap) references PHIEUNHAPHANG(MaPhieuNhap) on delete cascade,
	constraint fk_chitiet_pnh_to_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete set null
);

-- Create table PHIEUXUATHANG
create table PHIEUXUATHANG (
	MaPhieuXuat smallserial, -- Primary key
	NgayLapPhieu date default current_date,
	TongTien decimal(12, 4) default 0, -- constraint '(TongTien >= 0)' will be checked in frontend
	MaDaiLy smallint not null,
	MaKhachHang smallint not null,
	constraint pk_phieuxuathang primary key(MaPhieuXuat),
	constraint fk_phieuxuathang_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint fk_phieuxuathang_to_khachhang foreign key(MaKhachHang) references KHACHHANG(MaKhachHang) on delete cascade
);

-- Create table CHITIET_PXH 
create table CHITIET_PXH (
	MaCT_PXH serial, -- Primary key
	MaPhieuXuat smallint not null,
	MaMatHang smallint not null,
	SoLuongXuat int default 0, -- constraint '(SoLuongXuat >= 0)' will be checked in frontend
	constraint pk_chitiet_pxh primary key(MaCT_PXH),
	constraint fk_chitiet_pxh_to_phieuxuathang foreign key(MaPhieuXuat) references PHIEUXUATHANG(MaPhieuXuat) on delete cascade,
	constraint fk_chitiet_pxh_to_mathang foreign key(MaMatHang) references MATHANG(MaMatHang) on delete set null
);

-- Create table BAOCAOCONGNO
create table BAOCAOCONGNO (
	Thang smallint check (1 <= Thang and Thang <= 12), -- Primary key, must be in range [1, 12]
	MaDaiLy smallint not null,
	NoDau decimal(12, 4) not null, -- constraint '(NoDau >= 0)' will be checked in frontend
	PhatSinh decimal(12, 4) default 0, -- constraint '(PhatSinh >= 0)' will be checked in frontend
	NgayLapBaoCao date default current_date,
	constraint pk_baocaocongno primary key(Thang, MaDaiLy),
	constraint fk_baocaocongno_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade
);

-- Create table BAOCAODOANHSO
create table BAOCAODOANHSO (
	Thang smallint check (1 <= Thang and Thang <= 12), -- Primary key, must be in range [1, 12]
	MaDaiLy smallint not null,
	SoPhieuXuat smallint default 0, -- Because this field calculated by other tables so it need to be checked
	TongGiaTriXuat decimal(12, 4) default 0, -- check (TongGiaTriXuat >= 0) - it will be checked in frontend
	SoPhieuNhap smallint default 0, -- The same with SoPhieuXuat
	TongGiaTriNhap decimal(12, 4) default 0, -- check (TongGiaTriNhap >= 0)  - it will be checked in frontend
	ChiPhiBaoTri decimal(12, 4) default 0,
	NgayLapBaoCao date default current_date,
	constraint pk_baocaodoanhso primary key(Thang, MaDaiLy),
	constraint fk_baocaodoanhso_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade
);

-- Create table BAOTRIDAILY
create table BAOTRIDAILY (
	MaBaoTri smallserial,
	MaDaiLy smallint not null,
	ThoiDiemBatDau timestamp default current_timestamp,
	ThoiDiemKetThuc timestamp default current_timestamp,
	MoTa text,
	ChiPhiDuKien decimal(12, 4) default 0, -- check (ChiPhiDuKien >= 0) will be checked in frontend
	ChiPhiBaoTri decimal(12, 4) not null,
	constraint pk_baotridaily primary key(MaBaoTri),
	constraint fk_baotridaily_to_daily foreign key(MaDaiLy) references DAILY(MaDaiLy) on delete cascade,
	constraint ck_thoidiembatdau_thoidiemketthuc check ( ThoiDiemKetThuc >= ThoiDiemBatDau)
);

-- Create table QUITAC - just staff who work in a main head can see and manipulate QUITAC table
create table QUITAC (
	SoDaiLyToiDaMoiQuan smallint default 0 check(SoDaiLyToiDaMoiQuan >= 0), -- will be checked in frontend
	TiLeDonGiaBan decimal(5, 5) default 0 check(TileDonGiaban >= 0), -- will be checked in frontend
	SoThietBiToiDaTaiKhoan smallint default 0 check(SoThietBiToiDaTaiKhoan >= 0), -- will be checked in bll
	ThoiDiemCapNhat timestamp default current_timestamp -- This field will be filled by system's timstamp
);

-- Constraint to ensure reports must be completed before 29th of each month
alter table BAOCAOCONGNO
add constraint ck_baocaocongno_ngaylapbaocao check (EXTRACT(DAY from NgayLapBaoCao) < 29);

alter table BAOCAODOANHSO
add constraint ck_baocaodoanhso_ngaylapbaocao check (EXTRACT(DAY from NgayLapBaoCao) < 29);

-- INDEXING --
-- Adding an index on TenQuan for faster access to QUAN for getting information about QUAN
CREATE INDEX idx_tenquan ON QUAN(TenQuan);

-- Adding an index on TenLoaiDaiLy
CREATE INDEX idx_tenloaidaily ON LOAIDAILY(TenLoaiDaiLy);

-- Adding an index on TenDaiLy and SoDienThoai
CREATE INDEX idx_tendaily ON DAILY(TenDaiLy);
CREATE INDEX idx_daily_sodienthoai ON DAILY(SoDienThoai);

-- Adding an index on TenMatHang
CREATE INDEX idx_tenmathang ON MATHANG(TenMatHang);

-- Adding an index on MaDaiLy, NgayLapPhieu in PHIEUNHAPHANG
CREATE INDEX idx_pnh_madaily ON PHIEUNHAPHANG(MaDaiLy);
CREATE INDEX idx_pnh_ngaylapphieu ON PHIEUNHAPHANG(NgayLapPhieu);
CREATE INDEX idx_pnh_madaily_ngaylapphieu ON PHIEUNHAPHANG(MaDaiLy, NgayLapPhieu);

-- Adding an index on MaPhieuNhap and MaMatHang in CHITIET_PNH
CREATE INDEX idx_maphieunhap ON CHITIET_PNH(MaPhieuNhap);
CREATE INDEX idx_pctnh_mamathang ON CHITIET_PNH(MaMatHang);

-- Adding an index on MaDaiLy and NgayLapPhieu in PHIEUXUATHANG
CREATE INDEX idx_pxh_madaily ON PHIEUXUATHANG(MaDaiLy);
CREATE INDEX idx_pxh_ngaylapphieu ON PHIEUXUATHANG(NgayLapPhieu);
CREATE INDEX idx_pxh_madaily_ngaylapphieu ON PHIEUXUATHANG(MaDaiLy, NgayLapPhieu);

-- Adding an index on MaPhieuXuat and MaMatHang in CHITIET_PXH
CREATE INDEX idx_maphieuxuat ON CHITIET_PXH(MaPhieuXuat);
CREATE INDEX idx_ctpxh_mamathang ON CHITIET_PXH(MaMatHang);

-- Adding an index on NgayLapBaoCao and MaDaiLy in BAOCAOCONGNO
CREATE INDEX idx_baocaocongno_ngaylapbaocao ON BAOCAOCONGNO(NgayLapBaoCao);
CREATE INDEX idx_baocaocongno_madaily_ngaylapbaocao ON BAOCAOCONGNO(MaDaiLy, NgayLapBaoCao);

-- Adding an index on NgayLapbaoCao and MaDaiLy in BAOCAODOANHSO
CREATE INDEX idx_baocaodoanhso_ngaylapbaocao ON BAOCAODOANHSO(NgayLapBaoCao);
CREATE INDEX idx_baocaodoanhso_madaily_ngaylapbaocao ON BAOCAODOANHSO(MaDaiLy, NgayLapBaoCao);

-- Adding an index on MaDaiLy and ThoiDiemBatDau in BAOTRIDAILY
CREATE INDEX idx_thoidiembatdau ON BAOTRIDAILY(ThoiDiemBatDau);
CREATE INDEX idx_madaily_thoidiembatdau ON BAOTRIDAILY(MaDaiLy, ThoiDiemBatDau);

-- Adding an index on staff email and phone number for faster access staff information
CREATE INDEX idx_nhanvien_sodienthoai ON NHANVIEN(SoDienThoai);
CREATE INDEX idx_email ON NHANVIEN(Email);

-- Adding an index on TenChucvu, CapDo and Luong in CHUCVU
CREATE INDEX idx_tenchucvu ON CHUCVU(TenChucVu);
CREATE INDEX idx_capdo ON CHUCVU(CapDo);
CREATE INDEX idx_luong ON CHUCVU(Luong);

-- Adding an index on TenTaiKhoan and isActivated in TAIKHOAN
CREATE INDEX idx_tentaikhoan ON TAIKHOAN(TenTaiKhoan);
CREATE INDEX idx_tentaikhoan_isactivated ON TAIKHOAN(TenTaiKhoan, isActivated);

-- Adding an index SoDienThoai in KHACHHANG
CREATE INDEX idx_khachhang_sodienthoai ON KHACHHANG(SoDienThoai);

-- Adding an index in LOAIMATHANG
CREATE INDEX idx_loaimathang_tenloaimathang ON LOAIMATHANG(TenLoaiMatHang);
