-- FUNCTIONs -- 
-- F1 --
-- Function to calculate ThanhTien for CHITIET_PxH
-- Formula: ThanhTien = SoLuong * DonGia
-- Trigger on CHITIET_PNH
CREATE OR REPLACE FUNCTION calculate_ct_pnh_thanhtien(vMaCT_PNH int) RETURNS NUMERIC(12, 4)
AS $$
DECLARE
    SoLuong_pnh INT;
    DonGia_pnh NUMERIC(12, 4);
BEGIN
    SELECT SoLuongNhap INTO SoLuong_pnh FROM CHITIET_PNH WHERE MaCT_PNH = vMaCT_PNH;
    SELECT DonGiaNhap::NUMERIC(12, 4) INTO DonGia_pnh FROM CHITIET_PNH WHERE MaCT_PNH = vMaCT_PNH;
    RETURN SoLuong_pnh * DonGia_pnh;
END;
$$ LANGUAGE plpgsql;

-- Trigger on CHITIET_PXH
CREATE OR REPLACE FUNCTION calculate_ct_pxh_thanhtien(vMaCT_PXH int) RETURNS NUMERIC(12, 4)
AS $$
DECLARE
    MatHang_Nhap SMALLINT;
    SoLuong_pxh INT;
    DonGia_pnh NUMERIC(12, 4);
    TiLe_DonGia NUMERIC(5, 5);
BEGIN
    SELECT SoLuongXuat INTO SoLuong_pxh FROM CHITIET_PXH WHERE MaCT_PXH = vMaCT_PXH;
    SELECT MaMatHang INTO MatHang_Nhap FROM CHITIET_PXH WHERE MaCT_PXH = vMaCT_PXH;
    SELECT DonGiaNhap::NUMERIC(12, 4) INTO DonGia_pnh FROM CHITIET_PNH WHERE MaMatHang = MatHang_Nhap;
    SELECT TiLeDonGiaBan::NUMERIC(5, 5) INTO TiLe_DonGia FROM QUITAC;
    RETURN SoLuong_pxh * (DonGia_pnh / TiLe_DonGia);
END;
$$ LANGUAGE plpgsql;

-- F2 --
-- Function to calculate NoCuoi for Debt Report
CREATE OR REPLACE FUNCTION calculate_nocuoi(vThang smallint, vMaDaiLy smallint) RETURNS NUMERIC(12, 4)
AS $$
DECLARE
    vNoDau NUMERIC(12, 4);
    vPhatSinh NUMERIC(12, 4);
BEGIN
    SELECT NoDau::NUMERIC(12, 4) INTO vNoDau FROM BAOCAOCONGNO WHERE Thang = vThang and MaDaiLy = vMaDaiLy;
    SELECT PhatSinh::NUMERIC(12, 4) INTO vPhatSinh FROM BAOCAOCONGNO WHERE Thang = vThang and MaDaiLy = vMaDaiLy;
    RETURN vNoDau + vPhatSinh;
END;
$$ LANGUAGE plpgsql;

-- F3 --
-- Function to calculate DoanhThu for Revenue Report
CREATE OR REPLACE FUNCTION calculate_doanhthu(vThang smallint, vMaDaiLy smallint) RETURNS NUMERIC(12, 4)
AS $$
DECLARE
    vTongGiaTriXuat NUMERIC(12, 4);
    vTongGiaTriNhap NUMERIC(12, 4);
	vChiPhiBaoTri NUMERIC(12, 4);
BEGIN
    SELECT TongGiaTriNhap::NUMERIC(12, 4) INTO vTongGiaTriNhap FROM BAOCAODOANHSO WHERE Thang=vThang and MaDaiLy = vMaDaiLy;
    SELECT TongGiaTriXuat::NUMERIC(12, 4) INTO vTongGiaTriXuat FROM BAOCAODOANHSO WHERE Thang=vThang and MaDaiLy = vMaDaiLy;
	SELECT ChiPhiBaoTri::NUMERIC(12, 4) INTO vChiPhiBaoTri FROM BAOCAODOANHSO WHERE Thang=vThang and MaDaiLy = vMaDaiLy;
    RETURN vTongGiaTriXuat - vTongGiaTriNhap - vChiPhiBaotri;
END;
$$ LANGUAGE plpgsql;