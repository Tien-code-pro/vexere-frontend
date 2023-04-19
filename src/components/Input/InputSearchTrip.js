import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import {SELECT_TRIP, TRIP_RENDER} from "../../redux/types/BookingTypes";
import {getProvinceAction, getTripByUserAction, getTripPassengerAction} from "../../redux/actions/bookingAction";
import moment from "moment";
import {openNotificationWithIcon} from "../../util/lib/Nofication";
import {SET_LOADING_BUTTON, HIDE_LOADING_BUTTON} from "../../redux/types/LoadingTypes";

export default function InputSearchTrip(props) {
	let {listProvince, tripByUser, tripSearch} = useSelector((state) => state.BookingReducer);
	console.log("file: InputSearchTrip.js ~ line 17 ~ InputSearchTrip ~ tripSearch", tripSearch);
	let {loadingButton} = useSelector((state) => state.LoadingReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProvinceAction());
	}, []);
	const ListProvince = listProvince?.map((item, index) => {
		if (item.name.includes("Tỉnh")) {
			return item.name.substring(5, item.name.length);
		} else if (item.name.includes("Thành phố")) {
			return item.name.substring(10, item.name.length);
		} else {
			return item.name;
		}
	});
	const handleClick = () => {
		if (tripSearch.fromStation == "" || tripSearch.toStation == "" || tripSearch.startTime == "") {
			openNotificationWithIcon("error");
		} else {
			dispatch({
				type: SET_LOADING_BUTTON,
			});
			dispatch({
				type: TRIP_RENDER,
				tripRender: tripSearch,
			});
			setTimeout(function () {
				dispatch(getTripByUserAction(tripSearch));
			}, 2000);
		}
	};

	return (
		<>
			<div className="w-full search_trip">
				<div style={{}}>
					<div style={{marginLeft: "25%"}}>
						<div role="tab" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-active ant-tabs-tab">
							<div style={{background: "none", marginLeft: 20}}>
								<svg width="20" height="20" viewBox="0 0 24 24">
									<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"></path>
								</svg>
								<span style={{marginLeft: 25}} href="#">
									<a href="#" style={{color: "black"}}>
										Xe khách
									</a>
								</span>
							</div>
						</div>
						<div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
							<div style={{background: "none", marginLeft: 20}}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_30084_225879)" fill="#474747">
										<path d="M.51 4.637L4.68.497C5 .18 5.44 0 5.9 0h11.374C18.223 0 19 .763 19 1.714v6c0 .943-.777 1.715-1.727 1.715A2.578 2.578 0 0 1 14.682 12a2.578 2.578 0 0 1-2.591-2.571H6.909A2.578 2.578 0 0 1 4.32 12a2.578 2.578 0 0 1-2.592-2.571C.777 9.429 0 8.657 0 7.714v-1.86c0-.454.181-.891.51-1.217zm16.763-.351V2.57a.863.863 0 0 0-.864-.857h-2.59v3.429h2.59a.863.863 0 0 0 .864-.857zM14.682 10.5c.596 0 1.08-.48 1.08-1.071 0-.592-.484-1.072-1.08-1.072-.596 0-1.08.48-1.08 1.072 0 .591.484 1.071 1.08 1.071zM8.636 5.143h3.455V1.714H8.636v3.429zM4.318 10.5c.596 0 1.08-.48 1.08-1.071 0-.592-.484-1.072-1.08-1.072-.596 0-1.08.48-1.08 1.072 0 .591.484 1.071 1.08 1.071zM6.91 5.143V1.714h-.864L2.591 5.143h4.318zM21.167 18.284c-.128 0-.255.022-.376.036l-1.459-1.464h1.126c.39 0 .709-.321.709-.714v-.271a.707.707 0 0 0-1.027-.636l-1.615.814-1.82-1.835a.689.689 0 0 0-.497-.214h-2.125a.713.713 0 0 0 0 1.428h1.537c.192 0 .369.079.503.207l1.212 1.221h-2.373a.702.702 0 0 0-.32.079l-2.223 1.12a.697.697 0 0 1-.815-.135l-.85-.857a.742.742 0 0 0-.503-.207H7.708a.713.713 0 0 0 0 1.428h2.125c-1.785 0-3.18 1.657-2.755 3.528a2.816 2.816 0 0 0 2.09 2.106 2.839 2.839 0 0 0 3.499-2.778l.998 1.007c.27.272.63.421 1.006.421h.716c.51 0 .977-.27 1.232-.72l2.061-3.635.716.721a2.85 2.85 0 0 0-.978 2.892c.241 1.028 1.07 1.863 2.09 2.1 1.849.42 3.492-.993 3.492-2.786 0-1.578-1.268-2.856-2.833-2.856zM9.833 22.568c-.779 0-1.416-.642-1.416-1.428 0-.785.637-1.428 1.416-1.428.78 0 1.417.643 1.417 1.428 0 .786-.637 1.428-1.417 1.428zm11.334 0c-.78 0-1.417-.642-1.417-1.428 0-.785.637-1.428 1.417-1.428.779 0 1.416.643 1.416 1.428 0 .786-.637 1.428-1.416 1.428z"></path>
									</g>
								</svg>
								<span style={{marginLeft: 25}} href="#">
									<a href="# " style={{color: "black"}}>
										Thuê xe
									</a>
								</span>
							</div>
						</div>
						<div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
							<div style={{background: "none", marginLeft: 20}}>
								<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path d="M20 14v-2l-8.421-5V1.5C11.579.67 10.874 0 10 0S8.421.67 8.421 1.5V7L0 12v2l8.421-2.5V17l-2.105 1.5V20L10 19l3.684 1v-1.5L11.58 17v-5.5L20 14z"></path>
								</svg>
								<span style={{marginLeft: 25}} href="#">
									<a href="#" style={{color: "black"}}>
										Gửi hàng
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex search_trips_input grid grid-cols-6">
					<div className="search_input col-span-5">
						<div className="flex">
							<div className="input-1">
								<Autocomplete
									value={tripSearch.fromStation}
									disablePortal
									id="combo-box-demo"
									onChange={(event, newValue) => {
										dispatch({
											type: SELECT_TRIP,
											value: newValue,
											key: "fromStation",
										});
									}}
									options={ListProvince}
									sx={{width: 300}}
									renderInput={(params) => <TextField {...params} label="Điểm đi" />}
								/>
							</div>
							<div className="input-2" style={{marginLeft: 10}}>
								<Autocomplete
									value={tripSearch.toStation}
									disablePortal
									id="combo-box-demo"
									onChange={(event, newValue) => {
										dispatch({
											type: SELECT_TRIP,
											value: newValue,
											key: "toStation",
										});
									}}
									options={ListProvince}
									sx={{width: 300}}
									renderInput={(params) => <TextField {...params} label="Điểm đến" />}
								/>
							</div>
							<div className="input-3" style={{marginLeft: 10}}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Ngày đi"
										value={tripSearch.startTime}
										views={["year", "month", "day"]}
										format="DD-MM-YYYY"
										onChange={(newValue) => {
											dispatch({
												type: SELECT_TRIP,
												value: moment(newValue).format("YYYY-MM-DD"),
												key: "startTime",
											});
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</div>
						</div>
					</div>
					<div className="search_trips_button col-span-1 text-center" style={{marginLeft: 10, marginRight: 10}}>
						<LoadingButton className="w-full h-full" color="primary" onClick={handleClick} loading={loadingButton} loadingPosition="start" variant="contained">
							Tìm chuyến
						</LoadingButton>
					</div>
				</div>
			</div>
		</>
	);
}
