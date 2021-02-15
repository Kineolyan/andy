
import React, { useState } from 'react';
import {
	Button,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const createTasks = () => [
	{
		id: 1,
		name: "Mimi-kk-do",
		done: false,
	},
	{
		id: 2,
		name: "Popo Nathan",
		done: false,
	},
];

async function listTasks(setTasks, markLoading) {
	markLoading(true);
	setTasks(createTasks);
	markLoading(false);
}

async function markTask(task, setTasks, markLoading) {
	setTasks(tasks => tasks.map(t => t.id == task.id ? { ...t, done: true } : t));
}

function TaskView({ task, markDone }) {
	const buttonStyle = task.done ? styles.good : styles.late;
	return (
		<View key={task.name}>
			<TouchableOpacity
				style={buttonStyle}
				onPress={() => markDone(task)}>
				<Text style={styles.content}>
					{task.name}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function DailyScreen() {
	const [tasks, setTasks] = useState(null);
	const [loading, markLoading] = useState(false);

	let content;
	if (loading) {
		content = <Text>Loading...</Text>;
	} else if (tasks === null) {
		content = <Text>Load daily tasks</Text>;
	} else if (tasks.length === 0) {
		content = <Text>Rien à faire. Bravo :)</Text>;
	} else {
		const markDone = task => markTask(task, setTasks, markLoading);
		const entries = tasks.map(task => TaskView({ task, markDone }));
		content = (
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
				{entries}
			</ScrollView>);
	}

	return (
		<View style={styles.container}>
			{content}
			<View style={styles.refreshContainer}>
				<Button
					onPress={() => listTasks(setTasks, markLoading)}
					title="Rafraîchir la list"
					color="#841584" />
			</View>
		</View>
	);
}

DailyScreen.navigationOptions = {
	title: 'Pour aujourd\'hui',
};

const baseButtonStyle = {
	alignItems: 'center',
	padding: 10,
	marginBottom: 5,
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 10,
	},
	contentContainer: {
		paddingBottom: 70
	},
	refreshContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 10,
	},
	good: {
		...baseButtonStyle,
		backgroundColor: '#a2fc99',
	},
	late: {
		...baseButtonStyle,
		backgroundColor: '#fc5f5f'
	},
});
