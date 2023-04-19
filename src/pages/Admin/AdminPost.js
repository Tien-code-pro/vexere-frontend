import React, {Fragment, useEffect} from "react";
import {Layout, Breadcrumb, Table, Input, Space, Popconfirm, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAction, getUserAction} from "../../redux/actions/UserAction";
import {DeleteOutlined, UserAddOutlined} from "@ant-design/icons";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import AddPost from "../../components/Add/AddPost";

const {Content} = Layout;
const {Search} = Input;

export default function AdminPost() {
	const dispatch = useDispatch();
	const {listUser} = useSelector((state) => state.userReducer);
	console.log("file: AdminUser.js ~ line 17 ~ AdminUser ~ listUser", listUser);
	let arrFilterPhone = listUser.map((item) => {
		return {value: item.numberPhone, text: item.numberPhone};
	});
	useEffect(() => {
		dispatch(getUserAction());
	}, []);
	const columns = [
		{
			title: "Name",
			// dataIndex: "name",
			// onFilter: (value, record) => record.name.indexOf(value) === 0,
			// sorter: (a, b) => a.name.length - b.name.length,
			// sortDirections: ["descend"],
		},
		{
			title: "Description",
			dataIndex: "Description",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Action",

			render: (text, item) => {
				return (
					<Fragment>
						<div>
							{/* <button
								className="mr-3"
								onClick={() => {
									dispatch({
										type: SET_MODAL,
										title: "EDIT USER",
										content: <EditUser id={item.id} />,
										width: 600,
									});
								}}
							>
								<EditOutlined />
							</button> */}
							{/* <Popconfirm
								placement="topLeft"
								title={"Bạn có muốn xóa bài viết này"}
								onConfirm={() => {
									dispatch(deleteUserAction(item.id));
								}}
								okText="Yes"
								cancelText="No"
							>
								<button className="text-red-700">
									<DeleteOutlined />
								</button>
							</Popconfirm> */}
						</div>
					</Fragment>
				);
			},
		},
	];

	function onChange(pagination, filters, sorter, extra) {
		console.log("params", pagination, filters, sorter, extra);
	}

	const onSearch = (value) => {
		dispatch(getUserAction(value));
	};

	return (
		<Content style={{margin: "0 16px"}}>
			<Breadcrumb style={{margin: "16px 0"}}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>Post</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-background" style={{padding: 12, minHeight: 360}}>
				<Search placeholder="Search Post" allowClear enterButton="Search" size="large" onSearch={onSearch} className="mb-3" />
				<Button
					type="primary"
					className="mb-3"
					onClick={() => {
						dispatch({
							type: OPEN_DRAWER,
							title: "Thêm Bài Viết",
							content: <AddPost />,
						});
					}}
				>
					<UserAddOutlined />
					Thêm Bài Viết
				</Button>
				<Table columns={columns} dataSource={listUser} onChange={onChange} />
			</div>
		</Content>
	);
}
