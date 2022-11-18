import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import GroupList from '../components/Group/GroupList';
import GroupModal from '../components/Group/GroupModal';
import Spinner from '../components/Spinner';
import { AppContext } from '../contexts/AppContext';
import { delGroup, getGroupsByUserId } from '../actions/GroupsActions';
import { getTraineesByUserId } from '../actions/TraineesActions';
import { setGroupType } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const GroupsPage = ({ spinner, setLoading }) => {
	const { groups, setGroups, user, trainees, setTrainees } =
		useContext(AppContext);

	useEffect(() => {
		if (!trainees || trainees.length === 0) {
			setLoading(true);
			getTraineesByUserId(user.id).then((res) => {
				if (res) {
					setTrainees(res);
					setLoading(false);
				}
			});
		}
		if (!groups || groups.length === 0) {
			setLoading(true);
			getGroupsByUserId(user.id).then((res) => {
				if (res) {
					res = res.map((group) => setGroupType(group));
					setGroups(res);
					setLoading(false);
				}
			});
		}
	}, []);

	const onClickHandlerDelGroup = (id) => {
		const msj = confirm('Desea eliminar el grupo');
		if (msj)
			delGroup(id).then((res) => {
				const newData = groups.filter((group) => group.id !== id);
				setGroups(newData);
			});
	};

	return (
		<AppFrame>
			<Row>
				<Col>
					<Link to={'/home'} className='btn btn-primary'>
						Atrás
					</Link>
				</Col>
				<Col>
					<h5>GRUPOS</h5>
				</Col>
				<Col xs='auto'>
					<GroupModal></GroupModal>
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col xs='auto'>
					{groups && !spinner ? (
						<GroupList
							onClickGroup={(id) => {
								onClickHandlerDelGroup(id);
							}}
						></GroupList>
					) : (
						<Spinner></Spinner>
					)}
				</Col>
			</Row>
		</AppFrame>
	);
};

GroupsPage.propTypes = {
	spinner: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
};

export default GroupsPage;
