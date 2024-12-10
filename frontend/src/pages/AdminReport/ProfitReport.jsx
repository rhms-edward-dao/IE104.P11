import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { vi } from 'date-fns/locale';
import Header from '../../components/Header';
import ProfitIcon from '../../images/icons/total-budget.png';
import { getAllStore } from '../../assets/Stores/StoreData';
import { useTheme } from '../../contexts/ThemeContext';

const ProfitReport = () => {
  const { theme } = useTheme(); 
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [selectedAgency, setSelectedAgency] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [profit, setProfit] = useState(0);
  const [detailsPhieuNhap, setDetailsPhieuNhap] = useState([]);
  const [detailsPhieuXuat, setDetailsPhieuXuat] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getAllStore();
        setAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };
    fetchAgencies();
  }, []);

  const handleAgencyChange = (event) => {
    setSelectedAgency(event.target.value);
  };

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleFetchData = async () => {
    if (selectedAgency && dateRange[0].startDate && dateRange[0].endDate) {
      const startDate = dateRange[0].startDate.toISOString().split('T')[0];
      const endDate = dateRange[0].endDate.toISOString().split('T')[0];
      
      try {
        const responsePhieuNhap = await fetch(
          `http://127.0.0.1:8000/phieunhaphang/madaily_date?madaily=${selectedAgency}&start_date=${startDate}&end_date=${endDate}`
        );
        const dataPhieuNhap = await responsePhieuNhap.json();

        const responsePhieuXuat = await fetch(
          `http://127.0.0.1:8000/phieuxuathang/madaily_date?madaily=${selectedAgency}&start_date=${startDate}&end_date=${endDate}`
        );
        const dataPhieuXuat = await responsePhieuXuat.json();

        const isPhieuNhapEmpty = dataPhieuNhap.message === "Không tìm thấy phiếu nhập hàng của đại lý trong khoảng thời gian này";
        const isPhieuXuatEmpty = dataPhieuXuat.message === "Không tìm thấy phiếu xuất hàng của đại lý trong khoảng thời gian này";

        const tongNhap = isPhieuNhapEmpty ? 0 : dataPhieuNhap.reduce((acc, item) => acc + item.Phieunhaphang.tongtien, 0);
        const tongXuat = isPhieuXuatEmpty ? 0 : dataPhieuXuat.reduce((acc, item) => acc + item.Phieuxuathang.tongtien, 0);

        const totalProfit = tongXuat - tongNhap;
        setProfit(totalProfit);

        if (!isPhieuNhapEmpty) {
          const phieuNhapDetails = [];
          for (const phieu of dataPhieuNhap) {
            const responseDetail = await fetch(`http://127.0.0.1:8000/phieunhaphang/ctphieunhap/${phieu.Phieunhaphang.maphieunhap}`);
            const detailData = await responseDetail.json();
            phieuNhapDetails.push(...detailData);
          }
          setDetailsPhieuNhap(phieuNhapDetails);
        } else {
          setDetailsPhieuNhap([]);
        }

        if (!isPhieuXuatEmpty) {
          const phieuXuatDetails = [];
          for (const phieu of dataPhieuXuat) {
            const responseDetail = await fetch(`http://127.0.0.1:8000/phieuxuathang/ctphieuxuat/${phieu.Phieuxuathang.maphieuxuat}`);
            const detailData = await responseDetail.json();
            phieuXuatDetails.push(...detailData);
          }
          setDetailsPhieuXuat(phieuXuatDetails);
        } else {
          setDetailsPhieuXuat([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const pageStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5', 
      color: theme === 'dark' ? 'white' : 'black',
    },
    mainContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      gap: '10px',
      padding: '10px',
    },
    section: {
      backgroundColor: theme === 'dark' ? '#424242' : '#fff', 
      color: theme === 'dark' ? 'white' : 'black', 
      padding: '20px',
      borderRadius: '8px',
      boxShadow: theme === 'dark' ? '0 4px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.1)', 
    },
    datePickerSection: {
      minHeight: '120px',
      padding: '10px',
    },
    datePickerButton: {
      padding: '10px 20px',
      backgroundColor: theme === 'dark' ? '#007bff' : '#007bff',
      color: theme === 'dark' ? '#fff' : '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    agencySelector: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      color: theme === 'dark' ? 'white' : 'black', 
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: theme === 'dark' ? '#424242' : '#fff', 
      color: theme === 'dark' ? 'white' : 'black', 
    },
    profitCard: {
      container: {
        height: '120px',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: theme === 'dark' ? '0 4px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.1)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme === 'dark' ? '#424242' : '#fff', 
      },
      title: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '5px',
      },
      profitValue: {
        color: 'red',
        fontSize: '24px',
        fontWeight: 'bold',
      },
      icon: {
        width: '40px',
        height: '40px',
      },
    },
    tableContainer: {
      backgroundColor: theme === 'dark' ? '#424242' : '#fff', 
      color: theme === 'dark' ? 'white' : 'black',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: theme === 'dark' ? '0 4px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
      marginTop: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
      backgroundColor: theme === 'dark'? 'black' : '#f0f0f0',
      fontWeight: 'bold',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    sectionTitle: {
      fontWeight: 'bold', 
      marginBottom: '10px',
    },
  };
  
  return (
    <div style={pageStyles.container}>
      <Header headerTitle="Báo Cáo Lợi Nhuận" />
      <div style={pageStyles.mainContent}>
        <div style={{ ...pageStyles.section, ...pageStyles.datePickerSection }}>
          <div style={pageStyles.agencySelector}>
            <label 
              htmlFor="agencySelect" 
              style={{ fontWeight: 'bold', paddingLeft: '5px' }}
            >
              Chọn đại lý:
            </label>
            <select
              id="agencySelect"
              value={selectedAgency}
              onChange={handleAgencyChange}
              style={pageStyles.select}
            >
              <option value="">-- Chọn đại lý --</option>
              {agencies.map((agency) => (
                <option key={agency.Daily.madaily} value={agency.Daily.madaily}>
                  {agency.Daily.tendaily}
                </option>
              ))}
            </select>
          </div>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={vi}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button style={pageStyles.datePickerButton} onClick={handleFetchData}>
              Chọn ngày
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={pageStyles.profitCard.container}>
            <div>
              <h3 style={pageStyles.profitCard.title}>Tổng Lợi Nhuận:</h3>
              <h1 style={pageStyles.profitCard.profitValue}>{profit.toLocaleString()} VND</h1>
            </div>
            <img src={ProfitIcon} alt="Profit Icon" style={pageStyles.profitCard.icon} />
          </div>

          <div style={pageStyles.tableContainer}>
            <h3 style={{ fontWeight: 'bold' }}>Chi tiết phiếu nhập</h3>
            <table style={pageStyles.table}>
              <thead>
                <tr>
                  <th style={pageStyles.th}>Mã Mặt Hàng</th>
                  <th style={pageStyles.th}>Tên Mặt Hàng</th>
                  <th style={pageStyles.th}>Số Lượng Nhập</th>
                  <th style={pageStyles.th}>Đơn Giá Nhập</th>
                </tr>
              </thead>
              <tbody>
                {detailsPhieuNhap.map((item, index) => (
                  <tr key={index}>
                    <td style={pageStyles.td}>{item.Chitiet_pnh.mamathang}</td>
                    <td style={pageStyles.td}>{item.tenmathang}</td>
                    <td style={pageStyles.td}>{item.Chitiet_pnh.soluongnhap}</td>
                    <td style={pageStyles.td}>{item.Chitiet_pnh.dongianhap.toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={pageStyles.tableContainer}>
            <h3 style={{ fontWeight: 'bold' }}>Chi tiết phiếu xuất</h3>
            <table style={pageStyles.table}>
              <thead>
                <tr>
                  <th style={pageStyles.th}>Mã Mặt Hàng</th>
                  <th style={pageStyles.th}>Tên Mặt Hàng</th>
                  <th style={pageStyles.th}>Số Lượng Xuất</th>
                </tr>
              </thead>
              <tbody>
                {detailsPhieuXuat.map((item, index) => (
                  <tr key={index}>
                    <td style={pageStyles.td}>{item.Chitiet_pxh.mamathang}</td>
                    <td style={pageStyles.td}>{item.tenmathang}</td>
                    <td style={pageStyles.td}>{item.Chitiet_pxh.soluongxuat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitReport;


