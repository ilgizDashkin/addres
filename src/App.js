import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, Button, Group, CardGrid, Card, Div, Search } from '@vkontakte/vkui';//пакеты из вк
import Icon16Place from '@vkontakte/icons/dist/16/place';//это из https://vkcom.github.io/icons/#24/smile
import Icon28SafariOutline from '@vkontakte/icons/dist/28/safari_outline';
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon16Search from '@vkontakte/icons/dist/16/search';
import Icon28BugOutline from '@vkontakte/icons/dist/28/bug_outline';
import { addres } from './addres' //подключаем объект с адресами

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: []
		}
	}

	handleChange = (event) => {
		this.setState({ search: event.target.value });
	}

	searchAddres = () => {
		let search = this.state.search.toUpperCase()
		let result = []
		if (search.length > 2) {
			for (let prop in addres.district) {
				// if (addres['name'][prop].indexOf(search)!== -1) {
				if (addres['name'][prop] === search) {
					let lat = addres['gps'][prop][0]
					let lng = addres['gps'][prop][1]
					result.push([addres['district'][prop], addres['name'][prop], addres['adress'][prop], lat, lng])
				}
			}
			if (result.length === 0) {
				for (let prop in addres.district) {
					if (addres['name'][prop].indexOf(search) !== -1) {
						let lat = addres['gps'][prop][0]
						let lng = addres['gps'][prop][1]
						result.push([addres['district'][prop], addres['name'][prop], addres['adress'][prop], lat, lng])
					}
				}
			}
		}
		this.setState({ result })
	}

	componentDidMount() {
		//вызываем предыдущее состояние из локалсториджа
		const lastState = localStorage.addres
		if (lastState) {
			// console.log(lastState)
			this.setState(JSON.parse(lastState))
		}
	}

	componentDidUpdate() {
		localStorage.addres = JSON.stringify(this.state);//сохраняем стейт в локалсторадже каждый раз когда обновляем компоненты
	}

	render() {
		return (
			<View id="view" activePanel="panel">
				<Panel id="panel">
					<PanelHeader>поиск адресов РП-ТП</PanelHeader>
					<div className="container bg-dark text-center ">
						<div className='container p-2'>
							<a type="button" className="btn btn-danger btn-lg btn-block" href='https://ilgiz.h1n.ru/index.php'>на главную</a>
							<Search value={this.state.search} onChange={this.handleChange} placeholder='введите название РП-ТП, не менее 3 символов' />
							<Div style={{ display: 'flex' }}>
								<Button stretched before={<Icon16Search width={24} height={24} />} size="l" onClick={this.searchAddres}>
									ПОИСК
								</Button>
							</Div>
							{
								this.state.result.length ?
									<CardGrid>
										{
											this.state.result.map(element =>
												<Group >
													<CardGrid >
														<Div style={{ display: 'flex' }}>
															<Button stretched before={<Icon28SafariOutline />} size="l">{element[0]}</Button>
															<Button stretched before={<Icon28TargetOutline />} size="l">{element[1]}</Button>
														</Div>
														<Div>
															<Card size="l" mode="outline"  >
																{element[2]}
															</Card>
														</Div>
														<Div style={{ display: 'flex' }}>
															<Button stretched href={`https://maps.google.com/?hl=ru&q=${element[3]},${element[4]}`} before={<Icon16Place width={28} height={28} />} size="l">
																КАРТА
															</Button>
														</Div>
													</CardGrid>
												</Group>
											)
										}
									</CardGrid> :
									<Div style={{ display: 'flex' }}>
										<Button stretched before={<Icon28BugOutline />} size="l" style={{ color: 'yellow' }} >
											по запросу ничего не найдено, введите название РП-ТП, не менее 3 символов и нажмите поиск
								        </Button>
									</Div>
							}
						</div>
					</div>
				</Panel>
			</View>
		);
	}
}

export default App;

