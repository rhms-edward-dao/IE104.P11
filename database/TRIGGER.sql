-- Trigger --

-- T1 --
-- Automatically calculate TongTien for PHIEUNHAPHANG
CREATE OR REPLACE FUNCTION update_tongtien_pnh()
RETURNS TRIGGER AS $$
DECLARE
    newTongTien NUMERIC(12, 4) := calculate_ct_pnh_thanhtien(NEW.MaCT_PNH); -- Calling function for calculating TongTien here
BEGIN
    
    UPDATE PHIEUNHAPHANG
    SET TongTien = TongTien + newTongTien
    WHERE MaPhieuNhap = NEW.MaPhieuNhap;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tongtien_pnh_trigger
AFTER INSERT ON CHITIET_PNH
FOR EACH ROW EXECUTE FUNCTION update_tongtien_pnh();

-- T2 --
-- Automatically calculate TongTien for PHIEUXUATHANG
CREATE OR REPLACE FUNCTION update_tongtien_pxh()
RETURNS TRIGGER AS $$
DECLARE
    newTongTien NUMERIC(12, 4) := calculate_ct_pxh_thanhtien(NEW.MaCT_PXH);
BEGIN
    UPDATE PHIEUXUATHANG
    SET TONGTIEN = TONGTIEN + newTongTien
    WHERE MaPhieuXuat = NEW.MaPhieuXuat;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tongtien_pxh_trigger
AFTER INSERT ON CHITIET_PXH
FOR EACH ROW EXECUTE FUNCTION update_tongtien_pxh();

-- T3 --
-- Automatically adjust amount (SoLuongTon) of products in each store after import
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE MATHANG
    SET SoLuongTon = SoLuongTon + NEW.SoLuongNhap
    WHERE NEW.MaMatHang = MATHANG.MaMatHang;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inventory_trigger
AFTER INSERT ON CHITIET_PNH
FOR EACH ROW EXECUTE FUNCTION update_inventory();

-- T4 --
-- Automatically adjust amount (SoLuongTon) of products in each store after export
CREATE OR REPLACE FUNCTION restore_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE MATHANG
    SET SoLuongTon = SoLuongTon - NEW.SoLuongXuat
    WHERE NEW.MaMatHang = MATHANG.MaMatHang;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER restore_inventory_trigger
AFTER INSERT ON CHITIET_PXH
FOR EACH ROW EXECUTE FUNCTION restore_inventory();

-- T5 --
-- Automatically SoTienNo (total) in DAILY Table - check if it's becomming over SoTienNoToiDa
CREATE OR REPLACE FUNCTION check_sotienno()
RETURNS TRIGGER AS $$
DECLARE
    vTienNo NUMERIC(12, 4) := NEW.TongTien - NEW.TienDaThanhToan;
    tempSoTienNoToiDa NUMERIC(12, 4);
    tempSoTienNo NUMERIC(12, 4);
    tempTongTienNo NUMERIC(12, 4);
BEGIN
    -- Get value for tempSoTienNoToiDa
    SELECT SoTienNoToiDa::NUMERIC(12, 4) INTO tempSoTienNoToiDa 
    FROM LOAIDAILY, DAILY
    WHERE LOAIDAILY.MaLoaiDaiLy = DAILY.MaLoaiDaiLy
    AND DAILY.MaDaiLy = NEW.MaDaiLy;

    -- Get value for tempSoTienNo
    SELECT SoTienNo::NUMERIC(12, 4) INTO tempSoTienNo
    FROM DAILY
    WHERE DAILY.MaDaiLy = NEW.MaDaiLy;

    -- Increment value of SoTienNo in DAILY table
    tempTongTienNo := (tempSoTienNo + vTienNo);

    -- Check condition
    IF tempTongTienNo > tempSoTienNoToiDa THEN
        RETURN EXCEPTION 'Failed';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_sotienno_trigger
BEFORE INSERT ON PHIEUNHAPHANG
FOR EACH ROW EXECUTE FUNCTION check_sotienno();

-- T6 --
-- Constraint or checking if SoLuongXuat <= SoLuongTon
CREATE OR REPLACE FUNCTION check_soluongxuat()
RETURNS TRIGGER AS $$
DECLARE
    vSoLuongXuat INT;
    vSoLuongTon INT;
BEGIN
    -- Get value for SoLuongXuat & SoLuongTon
    vSoLuongXuat := NEW.SoLuongXuat;
    SELECT SoLuongTon INTO vSoLuongTon FROM SoLuongTon WHERE MaMatHang = NEW.MaMatHang;

    -- Check condition
    IF vSoLuongXuat > vSoLuongTon THEN
        RETURN EXCEPTION 'Failed!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_soluongxuat_trigger
BEFORE INSERT ON CHITIET_PXH
FOR EACH ROW EXECUTE FUNCTION check_soluongxuat();

-- T7 -- 
-- Create a trigger to automatically check if staff'phone is the same with store's phone or customer's phone number
CREATE OR REPLACE FUNCTION check_nhanvien_daily_phone_number()
RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM DAILY WHERE SoDienThoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	IF EXISTS (SELECT 1 FROM KHACHHANG WHERE SoDienthoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	RETURN NEW;
END
$$LANGUAGE plpgsql;

CREATE TRIGGER check_nhanvien_daily_phone_number_update_trigger
BEFORE UPDATE ON NHANVIEN
FOR EACH ROW EXECUTE FUNCTION check_nhanvien_daily_phone_number();

CREATE TRIGGER check_nhanvien_daily_phone_number_insert_trigger
BEFORE INSERT ON NHANVIEN
FOR EACH ROW EXECUTE FUNCTION check_nhanvien_daily_phone_number();
-- T8 --
-- Create a trigger to automatically check if store's phone is the same with staff's phone or customer's phone number
CREATE OR REPLACE FUNCTION check_daily_nhanvien_phone_number()
RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM NHANVIEN WHERE SoDienThoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	IF EXISTS (SELECT 1 FROM KHACHHANG WHERE SoDienThoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	RETURN NEW;
END
$$LANGUAGE plpgsql;

CREATE TRIGGER check_daily_nhanvien_phone_number_update_trigger
BEFORE UPDATE ON DAILY
FOR EACH ROW EXECUTE FUNCTION check_daily_nhanvien_phone_number();

CREATE TRIGGER check_daily_nhanvien_phone_number_insert_trigger
BEFORE INSERT ON DAILY
FOR EACH ROW EXECUTE FUNCTION check_daily_nhanvien_phone_number();

-- T9 --
-- Create a trigger for checking if customer's phone number is the same with store's phone number or staff's phone number
CREATE OR REPLACE FUNCTION check_khachhang_daily_nhanvien_phone_number()
RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS (SELECT 1 FROM DAILY WHERE SoDienThoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	IF EXISTS (SELECT 1 FROM NHANVIEN WHERE SoDienThoai = NEW.SoDienThoai) THEN
		RAISE EXCEPTION 'Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!';
	END IF;
	RETURN NEW;
END
$$LANGUAGE plpgsql;

CREATE TRIGGER check_khachhang_daily_nhanvien_phone_number_update_trigger
BEFORE UPDATE ON KHACHHANG
FOR EACH ROW EXECUTE FUNCTION check_khachhang_daily_nhanvien_phone_number();

CREATE TRIGGER check_khachhang_daily_nhanvien_phone_number_insert_trigger
BEFORE INSERT ON KHACHHANG
FOR EACH ROW EXECUTE FUNCTION check_khachhang_daily_nhanvien_phone_number();