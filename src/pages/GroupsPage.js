import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

import GroupList from '../components/GroupList/GroupList';
import { AppContext } from '../contexts/AppContext';
import { delGroup, getGroupsByUserId } from '../actions/GroupsActions';
import { getTraineesByUserId } from '../actions/TraineesActions';

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
					<Link to='/groups/new' className='btn btn-success'>
						Añadir
					</Link>
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
