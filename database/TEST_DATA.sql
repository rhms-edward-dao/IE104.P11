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
('Đại lý cấp 1', 50000000),
('Đại lý cấp 2', 65000000),
('Đại lý cấp 3', 80000000);
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
INSERT INTO DAILY (MaLoaiDaiLy, TenDaiLy, SoDienThoai, HinhAnh) VALUES
('1', 'Đại lý Bình Tân 1', '0857434243', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\stores\store-1.jpeg'),
('1', 'Đại lý Bình Tân 2', '0857434242', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\stores\store-2.jpeg'),
('2', 'Đại lý Tân Phú 1', '0857434241', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\stores\store-3.jpeg');
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
INSERT INTO MATHANG(TenMatHang, SoLuongTon, DonGia, TenDVT, MaDaiLy, MaLoaiMatHang, HinhAnh) VALUES
('Cá betta 1254 – Mái koi nemo tiger baby butterfly', 7, 110000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1254.jpg'),
('Cá betta 1586 – Mái koi nemo tiger butterfly guardian', 10, 110000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1586.jpg'),
('Cá betta 1648 – Koi nemo tiger body sumo itzamna', 30, 140000, 'con', '2', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1648.jpg'),
('Cá betta 1108 – Red fancy white star fin giống tốt', 11, 150000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1108.jpg'),
('Cá betta 1862 – Mái yellow fancy soulreaver hanuman', 13, 110000, 'con', '3', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1862.jpg'),
('Cá betta 1745 – Koi nemo candy copper multicolor first-defender ganesha', 12, 180000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1745.jpg'),
('Cá betta 1450 – Mái koi nemo candy butterfly athena', 40, 110000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1450.jpg'),
('Cá betta 1766 – Yellow fancy đại đế oathkeeper morpheus', 56, 150000, 'con', '3', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1766.jpg'),
('Cá betta 1115 – Koi nemo candy pinky colorfull Kakia', 14, 280000, 'con', '2', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1115.jpg'),
('Cá betta 1452 – Mái koi nemo candy nền đỏ aphrodite', 33, 110000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1452.jpg'),
('Cá betta 1449 – Mái koi nemo candy multicolor 7 sắc', 21, 110000, 'con', '3', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1449.jpg'),
('Cá betta 1496 – Mái koi red galaxy defender venus', 42, 110000, 'con', '2', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1496.jpg'),
('Cá betta 1711 – Koi nemo candy vũ tướng conqueror janus', 19, 180000, 'con', '3', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1711.jpg'),
('Cá betta 1823 – Yellow fancy blue star the stalwart yum kaax', 55, 180000, 'con', '2', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1823.jpg'),
('Cá betta 1494 – Mái koi nemo tiger classic color juno', 48, 110000, 'con', '1', '1', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1494.jpg'),

('Cá betta 1791 – Halfmoon red dragon thái cực chaosbreaker apollo', 23, 80000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1791.jpg'),
('Cá betta 1299 – Red fancy copper lotus Aker form đẹp', 67, 180000, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1299.jpg'),
('Cá betta 1445 – Halfmoon combtail dumbo lavender odin', 67, 110000, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1445.jpg'),
('Cá betta 1808 – Mái halfmoon super red dragon alom', 42, 40000, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1808.jpg'),
('Cá betta 1808 – Halfmoon rồng lửa wayguard morpheus', 69, 110000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1808.jpg'),
('Cá betta 1197 – Mái halfmoon blue red super star Hatshepsut', 23, 40000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1197.jpg'),
('Cá betta 1214 – Mái halfmoon blue red star Hatshepsut', 42, 40000, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1214.jpg'),
('Cá betta 1320 – Halfmoon samurai super star Oda Nobunaga', 22, 180000, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1320.jpg'),
('Cá betta 1325 – Halfmoon samurai butterfly illusion', 67, 180000, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1325.jpg'),
('Cá betta 1327 – Halfmoon mustard gas koi nền xanh vàng đẹp', 55, 80000, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1327.jpg'),
('Cá betta 1286 – Halfmoon samurai super star hàng hiếm Vip', 9, 180000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1286.jpg'),
('Cá betta 1850 – Halfmoon blue red butterfly stormchaser huitzilopochtli', 12, 80000, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1850.jpg'),
('Cá betta 1529 – Halfmoon blue white đại dương xanh', 66, 80000, 'con', '2', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1529.jpg'),
('Cá betta 1438 – Halfmoon samurai super star siêu hiếm 2024', 34, 180000, 'con', '1', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1438.jpg'),
('Cá betta 1474 – Halfmoon koi super white butterfly rama', 52, 80000, 'con', '3', '2', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1474.jpg'),

('Cá betta 1521 – Koi nemo galaxy dãi ngân hà avenger', 60, 140000, 'con', '1', '3', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1521.jpg'),
('Cá betta 1583 – Koi nemo galaxy tiger hổ rừng xanh', 23, 180000, 'con', '3', '3', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1583.jpg'),
('Cá betta 1206 – Koi nemo candy galaxy Tilphousia', 85, 140000, 'con', '3', '3', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1206.jpg'),
('Cá betta 1844 – Koi nemo galaxy butterfly champion of freedom zeus', 28, 180000, 'con', '2', '3', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\products\betta-1844.jpg');
SELECT * FROM MATHANG;
TRUNCATE MATHANG CASCADE;
ALTER SEQUENCE MATHANG_mamathang_seq RESTART WITH 1;

---------------------------------------------------------------- Insert Into NHANVIEN ---------------------------------------------------------------
INSERT INTO NHANVIEN(MaDaiLy, HoTen, NgaySinh, SoDienThoai, Email, HinhAnh) VALUES
('1', 'Nguyễn Văn A', '1999/1/20', '01263341260', '123456789@gmail.com', 'D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\staffs\staff-1.jpeg'),
('1', 'Nguyễn Văn B', '2000/5/22', '01263341266', '123456798@gmail.com', '"D:\Studying\UIT Online Class\IE104.P11 - Internet Va Cong Nghe Web\Bao Cao\IE104.P11\backend\images\staffs\staff-2.jpeg"');
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
INSERT INTO PHIEUNHAPHANG(MaDaiLy, TongTien) VALUES
('1', 1728000),
('1', 18472000),
('3', 14256000),
('3', 20392000),
('1', 17016000),
('2', 9088000),
('3', 12320000),
('3', 12256000),
('2', 5280000),
('3', 16576000);
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
('2', '15', 48, 88000),

('3', '16', 23, 64000),
('5', '17', 67, 144000),
('6', '18', 67, 88000),
('6', '19', 42, 32000),
('5', '20', 69, 88000),
('10', '21', 23, 32000),
('9', '22', 42, 32000),
('9', '23', 22, 144000),
('4', '24', 67, 144000),
('7', '25', 55, 64000),
('5', '26', 9, 144000),
('9', '27', 12, 64000),
('3', '28', 66, 64000),
('2', '29', 34, 144000),
('8', '30', 52, 64000),

('10', '31', 63, 112000),
('2', '32', 23, 144000),
('8', '33', 85, 112000),
('10', '34', 28, 144000);
SELECT * FROM CHITIET_PNH;
TRUNCATE CHITIET_PNH CASCADE;
ALTER SEQUENCE CHITIET_PNH_mact_pnh_seq RESTART WITH 1;

-------------------------------------------------------------- Insert Into PHIEUXUATHANG ------------------------------------------------------------
INSERT INTO PHIEUXUATHANG(MaDaiLy, MaKhachHang, TongTien) VALUES
('1', '1', 3640000),
('3', '1', 6900000);
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

select * from nhanvien
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