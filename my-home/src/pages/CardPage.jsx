import { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { SearchContexts } from '../context/Context';
import request from '../server';

const YearPages = () => {
  const { searchContext } = useContext(SearchContexts);
  const [datas, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const data = datas.filter((items) => items.year === searchContext)

  useEffect(() => {
    getData();
  }, []);


  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("Year");
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  console.log(data);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setSelected(null)
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("Year", values);
      } else {
        await request.put(`Year/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [

    {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button className='edit-btn' id={record.id} onClick={() => handleEditClick(record.id)}>Edit</button>
          <button className='delete-btn' id={record.id} onClick={handleDeleteClick}>Delete</button>
        </Space>
      ),
    },
  ];


  const handleEditClick = async (id) => {
    try {
      setSelected(id)
      setIsModalOpen(true);
      let { data } = await request.get(`Year/${id}`);
      form.setFieldsValue(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteClick = async (event) => {
    const id = event.target.id;
    let deleteConfirm = confirm("Do you want to delete this year?");
    if (deleteConfirm) {
      try {
        await request.delete(`Year/${id}`);
        getData()
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Teachers {data.length}</h1>
            <div>
              <>
                <Button type="primary" onClick={showModal}>
                  Add Teacher
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={selected === null ? 'Add Teacher' : 'Save Teacher'}>
                  <Form
                    form={form}
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                  >

                    <Form.Item
                      label="year"
                      name="year"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your year!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="month"
                      name="month"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your month!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Price"
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your price!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                  </Form>
                </Modal>
              </>
            </div>
          </div>
        )}
        columns={columns}
        dataSource={data}
        rowKey='id'
      />
    </>
  )
}

export default YearPages