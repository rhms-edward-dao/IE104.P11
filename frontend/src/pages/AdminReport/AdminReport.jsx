import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/Header';
import ProfitIcon from '../../images/icons/total-budget.png';
import StockIcon from '../../images/icons/total-product.png';
import RevenueIcon from '../../images/icons/revenue.png';

function AdminReport() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavigation = (path) => {
    navigate(`${path}`);
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    color: theme === 'dark' ? 'white' : 'black',
    margin: 0,
    padding: 0,
  };

  const headerStyle = {
    width: '100%',
    padding: '0',
    boxSizing: 'border-box',
    backgroundColor: theme === 'dark' ? '#424242' : '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    padding: '40px 0',
  };

  const reportOptionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '100px',
    marginTop: '-100px',    
  };

  const reportCardStyle = (width, height) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme === 'dark' ? '#424242' : 'white',
    color: theme === 'dark' ? 'white' : 'black',
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '15px', 
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
    textAlign: 'left',
    padding: '20px',
    cursor: 'pointer',    
  });

  const titleStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const iconStyle = {
    width: '60px',
    height: '60px',
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <Header headerTitle="Báo cáo" />
      </div>
      <div style={contentStyle}>
        <div style={reportOptionsStyle} className='flex-wrap'>
          <div style={reportCardStyle(365, 153)} onClick={() => handleNavigation('/profit-report')}>
            <p style={titleStyle}>Báo Cáo Lợi Nhuận</p>
            <img src={ProfitIcon} alt="Lợi Nhuận" style={iconStyle} />
          </div>
          <div style={reportCardStyle(344, 153)} onClick={() => handleNavigation('/stock-report')}>
            <p style={titleStyle}>Báo Cáo Tồn Kho</p>
            <img src={StockIcon} alt="Tồn Kho" style={iconStyle} />
          </div>
          <div style={reportCardStyle(365, 153)} onClick={() => handleNavigation('/revenue-report')}>
            <p style={titleStyle}>Báo Cáo Doanh thu</p>
            <img src={RevenueIcon} alt="Doanh Thu" style={iconStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReport;
