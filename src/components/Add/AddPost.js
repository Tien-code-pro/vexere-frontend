import React, {useEffect} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
import {registerAction} from "../../redux/actions/UserAction";
const {Option} = Select;

export default function AddPost(props) {
	const dispatch = useDispatch();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: "",
			description: "",
		},
		onSubmit: (values) => {
			console.log(values);
			let user = {
				name: values.name,
				description: values.description,
			};
			dispatch(registerAction(user));
			dispatch({type: CLOSE_DRAWER});
		},
	});
	const handleChange = (name) => {
		return (e) => {
			formik.setFieldValue(name, e.target.value);
		};
	};
	const handleChangeSelect = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	const handleChangeFile = (e) => {
		let file = e.target.files[0];

		formik.setFieldValue("file", file);
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên">
						<Input placeholder="Please enter name" name="name" onChange={handleChange("name")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.name}</p>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Description">
						<Input style={{width: "100%"}} name="Description" onChange={handleChange("Description")} />
						<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Cập Nhật
				</Button>
			</Form.Item>
		</Form>
	);
}
