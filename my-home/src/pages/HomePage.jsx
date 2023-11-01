import { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table } from 'antd';
import request from '../server';
import TextArea from 'antd/es/input/TextArea';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData();
  }, []);


  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("Year");
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }


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
      title: 'Yil',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Oy',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Tolangan summa',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Qoshimcha malumot',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'Ozgartirish yoki Ochirish',
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
            <h1>Barcha yillar | {data.length} ta malumot bor</h1>
            <div>
              <>
                <Button type="primary" onClick={showModal}>
                  Add
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={selected === null ? 'Add' : 'Save'}>
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

                    <Form.Item
                      label="Name"
                      name="description"
                    >
                      <TextArea />
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

export default HomePage