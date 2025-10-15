import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'; 
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchWinners } from '../store/winnersSlice';
import { Winner } from '../types/winner';

const WinnersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { winners, total, loading, error } = useAppSelector(
    state => (state as any).winners
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'wins' | 'time'>('wins');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    dispatch(fetchWinners({ page: currentPage, limit: 10, sort: sortField, order: sortOrder }));
  }, [dispatch, currentPage, sortField, sortOrder]);

  const columns: ColumnsType<Winner & { name?: string; color?: string }> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { 
      title: 'Car', 
      dataIndex: 'color', 
      key: 'car', 
      render: (color: string, record: Winner & { name?: string; color?: string }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              backgroundColor: color,
              marginRight: 8,
            }}
          />
          {record.name}
        </div>
      ),
    },
    { 
      title: 'Wins', 
      dataIndex: 'wins', 
      key: 'wins', 
      sorter: true,
      sortOrder: sortField === 'wins' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined,
    },
    { 
      title: 'Best Time', 
      dataIndex: 'time', 
      key: 'time', 
      sorter: true,
      sortOrder: sortField === 'time' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : undefined,
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, unknown>,
    sorter: any
  ) => {
    setCurrentPage(pagination.current || 1);

    if (sorter && !Array.isArray(sorter) && sorter.field) {
      const field = sorter.field as 'wins' | 'time';
      const order = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSortField(field);
      setSortOrder(order);
    }
  };

  return (
    <div className="p-4">
      <h1 className="garage-title">
        <span className="garage-glow">🏆 Winners</span>
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={winners}
        pagination={{ current: currentPage, pageSize: 10, total }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default WinnersPage;
