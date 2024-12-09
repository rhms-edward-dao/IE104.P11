import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getAllStore } from '../../assets/Stores/StoreData';
import { getProductByStoreId } from '../../assets/Products/ProductData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pageStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    padding: '20px',
    gap: '20px',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  cardRow: {
    display: 'flex',
    gap: '20px',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontWeight: 'bold', 
  },
  tableSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontWeight: 'bold', 
    marginBottom: '10px',
  },
  searchSection: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '25px',
  },
  label: {
    fontWeight: 'bold', 
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '200px',
  },
};

const InventoryChart = ({ productData }) => {
  const chartData = productData.map(item => ({
    name: item.Mathang.mamathang,
    id: item.Mathang.mamathang,
    inventoryQuantity: item.Mathang.soluongton,
    productType: item.tenloaimathang,
  }));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={150}
          />
          <YAxis label={{ value: 'Số lượng tồn kho', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="inventoryQuantity" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StockReport = () => {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [storeData, setStoreData] = useState([]);
  const [storeSearchResults, setStoreSearchResults] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStore();
        setStoreData(data);
        setStoreSearchResults(data.map(store => store.Daily.tendaily));
      } catch (error) {
        console.error('Error fetching store data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleAgentChange = async (e) => {
    const selectedAgentName = e.target.value;
    setSelectedAgent(selectedAgentName);

    const selectedStore = storeData.find(store => store.Daily.tendaily === selectedAgentName);
    if (selectedStore) {
      const selectedStoreId = selectedStore.Daily.madaily;
      try {
        const products = await getProductByStoreId(selectedStoreId);
        setProductData(products);
        setTotalProducts(products.length);
        setOutOfStockProducts(products.filter(product => product.Mathang.soluongton === 0).length);
      } catch (error) {
        console.error('Error fetching product data for selected store: ', error);
      }
    }
  };

  return (
    <div style={pageStyles.container}>
      <Header headerTitle="Báo Cáo Tồn Kho" />
      <div style={pageStyles.searchSection}>
        <label htmlFor="agentSelect" style={pageStyles.label}>Tìm kiếm theo:</label>
        <select
          id="agentSelect"
          style={pageStyles.select}
          value={selectedAgent}
          onChange={handleAgentChange}
        >
          <option value="" disabled>Tên đại lý</option>
          {storeSearchResults.map((agent, index) => (
            <option key={index} value={agent}>{agent}</option>
          ))}
        </select>
      </div>
      <div style={pageStyles.mainContent}>
        <div style={pageStyles.leftSection}>
          <div style={pageStyles.cardRow}>
            <div style={pageStyles.card}>
              <h3 style={pageStyles.cardTitle}>Tổng số sản phẩm</h3>
              <h1 style={{ color: 'red' }}>{totalProducts}</h1>
            </div>
            <div style={pageStyles.card}>
              <h3 style={pageStyles.cardTitle}>Tổng số hết hàng</h3>
              <h1 style={{ color: 'red' }}>{outOfStockProducts}</h1>
            </div>
          </div>
          <div style={pageStyles.tableSection}>
            <h3 style={pageStyles.sectionTitle}>Các sản phẩm có số lượng tồn kho thấp:</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Mã sản phẩm</th>
                  <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Tên sản phẩm</th>
                  <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Số lượng tồn kho</th>
                </tr>
              </thead>
              <tbody>
                {productData
                  .filter(product => product.Mathang.soluongton < 10)
                  .map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Mathang.mamathang}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Mathang.tenmathang}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Mathang.soluongton}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={pageStyles.rightSection}>
          <h3 style={pageStyles.sectionTitle}>Biểu đồ số lượng tồn kho của các sản phẩm</h3>
          {productData.length > 0 ? (
            <InventoryChart productData={productData} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Vui lòng chọn đại lý để xem biểu đồ.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockReport;
