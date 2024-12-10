SET datestyle to dmy;
---------------------------------------------------------------- Insert Into TAIKHOAN ---------------------------------------------------------------
INSERT INTO TAIKHOAN(TenTaiKhoan, MatKhau, isActivated) VALUES
('NVA', '027735', True),
('NVB', '027735', True),
('NVC', '027735', True),
('NVD', '027735', True),
('NVE', '027735', True);
SELECT * FROM TAIKHOAN;
TRUNCATE TAIKHOAN CASCADE;
ALTER SEQUENCE TAIKHOAN_mataikhoan_seq RESTART WITH 1;

----------------------------------------------------------------- Insert Into QUYTAC ----------------------------------------------------------------
INSERT INTO QUITAC(SoDaiLyToiDaMoiQuan, TiLeDonGiaBan, SoThietBiToiDaTaiKhoan) VALUES
(3, 0.8, 3);
SELECT * FROM QUITAC;
TRUNCATE QUITAC CASCADE;

----------------------------------------------------------------- Insert Into CHUCVU ----------------------------------------------------------------
INSERT INTO CHUCVU (TenChucVu, Capdo, Luong) VALUES
('Quản lý đại lý', 2, 20000000),
('Thu ngân', 1, 10000000);
SELECT * FROM CHUCVU;
TRUNCATE CHUCVU CASCADE;
ALTER SEQUENCE CHUCVU_machucvu_seq RESTART WITH 1;

------------------------------------------------------------------ Insert Into QUAN -----------------------------------------------------------------
INSERT INTO QUAN (TenQuan, TenThanhPho) VALUES
('Bình Tân', 'Hồ Chí Minh'),
('Tân Phú', 'Hồ Chí Minh'),
('Bình Thạnh', 'Hồ Chí Minh'),
('Tân Phú Đông', 'Sa Đéc');
SELECT * FROM QUAN;
TRUNCATE QUAN CASCADE;
ALTER SEQUENCE QUAN_maquan_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into LOAIDAILY --------------------------------------------------------------
INSERT INTO LOAIDAILY(TenLoaiDaiLy, SoTienNoToiDa) VALUES
('Đại lý cấp 1', 20000000),
('Đại lý cấp 2', 35000000),
('Đại lý cấp 3', 50000000);
SELECT * FROM LOAIDAILY;
TRUNCATE LOAIDAILY CASCADE;
ALTER SEQUENCE LOAIDAILY_maloaidaily_seq RESTART WITH 1;

--------------------------------------------------------------- Insert Into LOAIMATHANG -------------------------------------------------------------
INSERT INTO LOAIMATHANG(TenLoaiMatHang) VALUES
('Koi'),
('Halfmoon'),
('Galaxy'),
('Samurai'),
('Fancy'),
('Dragon'),
('Nemo');
SELECT * FROM LOAIMATHANG;
TRUNCATE LOAIMATHANG CASCADE;
ALTER SEQUENCE LOAIMATHANG_maloaimathang_seq RESTART WITH 1;

------------------------------------------------------------------ Insert Into DAILY ----------------------------------------------------------------
INSERT INTO DAILY (MaLoaiDaiLy, TenDaiLy, SoDienThoai) VALUES
('1', 'Đại lý Bình Tân 1', '0857434243'),
('1', 'Đại lý Bình Tân 2', '0857434242'),
('2', 'Đại lý Tân Phú 1', '0857434241');
SELECT * FROM DAILY;
TRUNCATE DAILY CASCADE;
ALTER SEQUENCE DAILY_madaily_seq RESTART WITH 1;

------------------------------------------------------------- Insert Into DAILY_DIACHI -----------------------------------------------------------
INSERT INTO DAILY_DIACHI(MaDaiLy, MaQuan, DiaChi, KinhDo, ViDo) VALUES
('1', '2', '23 Văn Cao, Phú Thạnh, Tân Phú, Hồ Chí Minh', '123', '456'),
('2', '1', '820 Hương Lộ 2, Bình Trị Đông A, Bình Tân, Hồ Chí Minh', '123', '456'),
('3', '3', '32 Văn Cao, Phú Thạnh, Tân Bình, Hồ Chí Minh', '123', '456');
SELECT * FROM DAILY_DIACHI
TRUNCATE NHANVIEN_DIACHI CASCADE

--------------------------------------------------------------- Insert Into BAOTRIDAILY -------------------------------------------------------------
INSERT INTO BAOTRIDAILY (MaDaiLy, ThoiDiemBatDau, ThoiDiemKetThuc, ChiPhiDuKien, ChiPhiBaoTri) VALUES
('1', '15/10/2024', '20/10/2024', 150000, 130000),
('2', '17/10/2024', '22/10/2024', 1654000, 1444000),
('3', '22/10/2024', '01/11/2024', 223000, 233000);
SELECT * FROM BAOTRIDAILY;
TRUNCATE BAOTRIDAILY CASCADE;
ALTER SEQUENCE BAOTRIDAILY_mabaotri_seq RESTART WITH 1;

----------------------------------------------------------------- Insert Into MATHANG ---------------------------------------------------------------
INSERT INTO MATHANG(TenMatHang, DonGia, TenDVT, MaDaiLy, MaLoaiMatHang) VALUES
('Cá betta 1254 – Mái koi nemo tiger baby butterfly', 0, 'con', '1', '1'),
('Cá betta 1586 – Mái koi nemo tiger butterfly guardian', 0, 'con', '1', '1'),
('Cá betta 1648 – Koi nemo tiger body sumo itzamna', 0, 'con', '2', '1'),
('Cá betta 1108 – Red fancy white star fin giống tốt', 0, 'con', '1', '1'),
('Cá betta 1862 – Mái yellow fancy soulreaver hanuman', 0, 'con', '3', '1'),
('Cá betta 1745 – Koi nemo candy copper multicolor first-defender ganesha', 0, 'con', '1', '1'),
('Cá betta 1450 – Mái koi nemo candy butterfly athena', 0, 'con', '1', '1'),
('Cá betta 1766 – Yellow fancy đại đế oathkeeper morpheus', 0, 'con', '3', '1'),
('Cá betta 1115 – Koi nemo candy pinky colorfull Kakia', 0, 'con', '2', '1'),
('Cá betta 1452 – Mái koi nemo candy nền đỏ aphrodite', 0, 'con', '1', '1'),
('Cá betta 1449 – Mái koi nemo candy multicolor 7 sắc', 0, 'con', '3', '1'),
('Cá betta 1496 – Mái koi red galaxy defender venus', 0, 'con', '2', '1'),
('Cá betta 1711 – Koi nemo candy vũ tướng conqueror janus', 0, 'con', '3', '1'),
('Cá betta 1823 – Yellow fancy blue star the stalwart yum kaax', 0, 'con', '2', '1'),
('Cá betta 1494 – Mái koi nemo tiger classic color juno', 0, 'con', '1', '1'),

('Cá betta 1791 – Halfmoon red dragon thái cực chaosbreaker apollo', 0, 'con', '1', '2'),
('Cá betta 1299 – Red fancy copper lotus Aker form đẹp', 0, 'con', '2', '2'),
('Cá betta 1445 – Halfmoon combtail dumbo lavender odin', 0, 'con', '3', '2'),
('Cá betta 1633 – Mái halfmoon super red dragon alom', 0, 'con', '2', '2'),
('Cá betta 1808 – Halfmoon rồng lửa wayguard morpheus', 0, 'con', '1', '2'),
('Cá betta 1197 – Mái halfmoon blue red super star Hatshepsut', 0, 'con', '1', '2'),
('Cá betta 1214 – Mái halfmoon blue red star Hatshepsut', 0, 'con', '3', '2'),
('Cá betta 1320 – Halfmoon samurai super star Oda Nobunaga', 0, 'con', '2', '2'),
('Cá betta 1325 – Halfmoon samurai butterfly illusion', 0, 'con', '2', '2'),
('Cá betta 1327 – Halfmoon mustard gas koi nền xanh vàng đẹp', 0, 'con', '3', '2'),
('Cá betta 1286 – Halfmoon samurai super star hàng hiếm Vip', 0, 'con', '1', '2'),
('Cá betta 1850 – Halfmoon blue red butterfly stormchaser huitzilopochtli', 0, 'con', '3', '2'),
('Cá betta 1529 – Halfmoon blue white đại dương xanh', 0, 'con', '2', '2'),
('Cá betta 1438 – Halfmoon samurai super star siêu hiếm 2024', 0, 'con', '1', '2'),
('Cá betta 1474 – Halfmoon koi super white butterfly rama', 0, 'con', '3', '2'),

('Cá betta 1521 – Koi nemo galaxy dãi ngân hà avenger', 0, 'con', '1', '3'),
('Cá betta 1583 – Koi nemo galaxy tiger hổ rừng xanh', 0, 'con', '3', '3'),
('Cá betta 1206 – Koi nemo candy galaxy Tilphousia', 0, 'con', '3', '3'),
('Cá betta 1844 – Koi nemo galaxy butterfly champion of freedom zeus', 0, 'con', '2', '3');
SELECT * FROM MATHANG;
TRUNCATE MATHANG CASCADE;
ALTER SEQUENCE MATHANG_mamathang_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into NHANVIEN ---------------------------------------------------------------
INSERT INTO NHANVIEN(MaDaiLy, HoTen, NgaySinh, SoDienThoai, Email) VALUES
('1', 'Nguyễn Văn A', '1999/1/20', '01263341260', '123456789@gmail.com'),
('1', 'Nguyễn Văn B', '2000/5/22', '01263341266', '123456798@gmail.com');
SELECT * FROM NHANVIEN
TRUNCATE NHANVIEN CASCADE
ALTER SEQUENCE NHANVIEN_manhanvien_seq RESTART WITH 1

------------------------------------------------------------ Insert Into TAIKHOAN_NHANVIEN ----------------------------------------------------------
INSERT INTO TAIKHOAN_NHAVIEN(MaNhanVien, MaTaiKhoan) VALUES
('1', '1'),
('2', '2');
SELECT * FROM TAIKHOAN_NHAVIEN
TRUNCATE TAIKHOAN_NHAVIEN CASCADE

------------------------------------------------------------ Insert Into NHANVIEN_CHUCVU ----------------------------------------------------------
INSERT INTO NHANVIEN_CHUCVU(MaNhanVien, MaChucVu, NgayBatDau) VALUES
('1', '1', '10/03/2003'),
('2', '2', '04/03/2001');
SELECT * FROM NHANVIEN_CHUCVU
TRUNCATE NHANVIEN_CHUCVU CASCADE

------------------------------------------------------------- Insert Into NHANVIEN_DIACHI -----------------------------------------------------------
INSERT INTO NHANVIEN_DIACHI(MaNhanVien, MaQuan, DiaChi, KinhDo, ViDo) VALUES
('1', '2', '23 Văn Cao, Phú Thạnh, Tân Phú, Hồ Chí Minh', '123', '456'),
('2', '1', '820 Hương Lộ 2, Bình Trị Đông A, Bình Tân, Hồ Chí Minh', '123', '456');
SELECT * FROM NHANVIEN_DIACHI
TRUNCATE NHANVIEN_DIACHI CASCADE

---------------------------------------------------------------- Insert Into KHACHHANG --------------------------------------------------------------
INSERT INTO KHACHHANG(TenKhachHang, SoDienThoai) VALUES
('Nguyễn Văn C', '0918676586'),
('Nguyễn Văn D', '0918676587'),
('Nguyễn Văn E', '0918676588'),
('Nguyễn Văn F', '0918676589'),
('Nguyễn Văn G', '0918676590'),
('Nguyễn Văn H', '0918676591'),
('Nguyễn Văn I', '0918676592'),
('Nguyễn Văn J', '0918676593'),
('Nguyễn Văn K', '0918676594'),
('Nguyễn Văn L', '0918676595'),
('Nguyễn Văn M', '0918676596'),
('Nguyễn Văn N', '0918676597'),
('Nguyễn Văn O', '0918676598'),
('Nguyễn Văn P', '0918676599'),
('Nguyễn Văn Q', '0918676501'),
('Nguyễn Văn R', '0918676502'),
('Nguyễn Văn S', '0918676503'),
('Nguyễn Văn T', '0918676504'),
('Nguyễn Văn U', '0918676505'),
('Nguyễn Văn V', '0918676506');
SELECT * FROM KHACHHANG;
TRUNCATE KHACHHANG CASCADE;
ALTER SEQUENCE KHACHHANG_makhachhang_seq RESTART WITH 1;

------------------------------------------------------------- Insert Into KHACHHANG_DIACHI ----------------------------------------------------------
INSERT INTO KHACHHANG_DIACHI(MaKhachHang, MaQuan, DiaChi, KinhDo, ViDo) VALUES
('1', '2', '23 Văn Cao, Phú Thạnh, Tân Phú, Hồ Chí Minh', '123', '456'),
('2', '1', '820 Hương Lộ 2, Bình Trị Đông A, Bình Tân, Hồ Chí Minh', '789', '101'),
('3', '3', '33 Văn Cao, Phú Thạnh, Tân Bình, Hồ Chí Minh', '121', '314'),
('4', '4', '25 Văn Cao, Phú Thạnh, Phú Nhuận, Hồ Chí Minh', '151', '617'),
('5', '1', '26 Văn Cao, Phú Thạnh, Bình Tân, Hồ Chí Minh', '181', '920'),
('6', '2', '27 Văn Cao, Phú Thạnh, Thủ Đức, Hồ Chí Minh', '212', '223'),
('7', '3', '28 Văn Cao, Phú Thạnh, 1, Hồ Chí Minh', '242', '526'),
('8', '4', '29 Văn Cao, Phú Thạnh, 2, Hồ Chí Minh', '272', '829'),
('9', '1', '20 Văn Cao, Phú Thạnh, 3, Hồ Chí Minh', '303', '132'),
('10', '2', '31 Văn Cao, Phú Thạnh, 4, Hồ Chí Minh', '333', '435'),
('11', '3', '34 Văn Cao, Phú Thạnh, 5, Hồ Chí Minh', '363', '738'),
('12', '4', '35 Văn Cao, Phú Thạnh, 6, Hồ Chí Minh', '394', '041'),
('13', '1', '36 Văn Cao, Phú Thạnh, 7, Hồ Chí Minh', '424', '344'),
('14', '2', '37 Văn Cao, Phú Thạnh, 8, Hồ Chí Minh', '454', '647'),
('15', '3', '38 Văn Cao, Phú Thạnh, 9, Hồ Chí Minh', '484', '950'),
('16', '4', '39 Văn Cao, Phú Thạnh, 10, Hồ Chí Minh', '515', '253'),
('17', '1', '40 Văn Cao, Phú Thạnh, 11, Hồ Chí Minh', '545', '556'),
('18', '2', '41 Văn Cao, Phú Thạnh, 12, Hồ Chí Minh', '575', '859'),
('19', '4', '42 Văn Cao, Phú Thạnh, Gò Vấp, Hồ Chí Minh', '606', '162'),
('20', '3', '43 Văn Cao, Phú Thạnh, Hóc Môn, Hồ Chí Minh', '636', '465');
SELECT * FROM KHACHHANG_DIACHI
TRUNCATE KHACHHANG_DIACHI CASCADE

-------------------------------------------------------------- Insert Into PHIEUNHAPHANG ------------------------------------------------------------
INSERT INTO PHIEUNHAPHANG(MaDaiLy) VALUES
('1'),
('1'),
('3'),
('3'),
('1'),
('2'),
('3'),
('3'),
('2'),
('3');
SELECT * FROM PHIEUNHAPHANG;
TRUNCATE PHIEUNHAPHANG CASCADE;
ALTER SEQUENCE PHIEUNHAPHANG_maphieunhap_seq RESTART WITH 1;

--------------------------------------------------------------- Insert Into CHITIET_PNH -------------------------------------------------------------
INSERT INTO CHITIET_PNH(MaPhieuNhap, MaMatHang, SoLuongNhap, DonGiaNhap) VALUES
('1', '1', 12, 88000),
('7', '2', 10, 88000),
('1', '3', 30, 112000),
('3', '4', 20, 120000),
('4', '5', 13, 88000),
('1', '6', 12, 144000),
('3', '7', 70, 88000),
('4', '8', 80, 120000),
('2', '9', 14, 224000),
('2', '10', 33, 88000),
('6', '11', 21, 88000),
('10', '12', 54, 88000),
('8', '13', 19, 144000),
('7', '14', 55, 144000),
('2', '15', 86, 88000),

('3', '16', 23, 64000),
('5', '17', 67, 144000),
('6', '18', 67, 88000),
('6', '19', 42, 32000),
('5', '20', 96, 88000),
('10', '21', 23, 32000),
('9', '22', 42, 32000),
('9', '23', 22, 144000),
('4', '24', 67, 144000),
('7', '25', 55, 64000),
('5', '26', 79, 144000),
('9', '27', 12, 64000),
('3', '28', 66, 64000),
('2', '29', 54, 144000),
('8', '30', 52, 64000),

('10', '31', 63, 112000),
('2', '32', 53, 144000),
('8', '33', 85, 112000),
('10', '34', 82, 144000);
SELECT * FROM CHITIET_PNH;
TRUNCATE CHITIET_PNH CASCADE;
ALTER SEQUENCE CHITIET_PNH_mact_pnh_seq RESTART WITH 1;

-------------------------------------------------------------- Insert Into PHIEUXUATHANG ------------------------------------------------------------
INSERT INTO PHIEUXUATHANG(MaDaiLy, MaKhachHang) VALUES
('1', '1'),
('3', '1');
SELECT * FROM PHIEUXUATHANG;
TRUNCATE PHIEUXUATHANG CASCADE;
ALTER SEQUENCE PHIEUXUATHANG_maphieuxuat_seq RESTART WITH 1;

--------------------------------------------------------------- Insert Into CHITIET_PXH -------------------------------------------------------------
INSERT INTO CHITIET_PXH(MaPhieuXuat, MaMatHang, SoLuongXuat) VALUES
('1', '1', 5),
('1', '4', 9),
('2', '7', 30),
('1', '12', 12),
('2', '8', 24),
('1', '31', 3);
SELECT * FROM CHITIET_PXH;
TRUNCATE CHITIET_PXH CASCADE;
ALTER SEQUENCE CHITIET_PXH_mact_pxh_seq RESTART WITH 1;

-------------------------------------------------------------- Insert Into BAOCAODOANHSO ------------------------------------------------------------
INSERT INTO BAOCAODOANHSO(Thang, MaDaiLy) VALUES
('10', '1'),
('10', '2'),
('10', '3');
SELECT * FROM BAOCAODOANHSO;
TRUNCATE BAOCAODOANHSO CASCADE;

-------------------------------------------------------------- Insert Into BAOCAOCONGNO -------------------------------------------------------------
INSERT INTO BAOCAOCONGNO(Thang, MaDaiLy, NoDau, PhatSinh) VALUES
('10', '1', 25601000, 444000),
('11', '2', 11246000, 119400),
('12', '3', 77541000, 149000);
SELECT * FROM BAOCAOCONGNO;
TRUNCATE BAOCAOCONGNO CASCADE;


INSERT INTO TAIKHOAN_KHACHHANG values
('1', '1');
SELECT * FROM TAIKHOAN_KHACHHANG
TRUNCATE TAIKHOAN_KHACHHANG CASCADE