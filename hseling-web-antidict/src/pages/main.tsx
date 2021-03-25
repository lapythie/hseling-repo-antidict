import React, {ChangeEvent, useState} from "react";
import {Button, Card, Col, Divider, Input, Layout, List, Row, Space} from "antd";
import Highlighter from "react-highlight-words";
import './main.css';

const {TextArea} = Input;
const {Content} = Layout;


export function Main() {
    const [text, setText] = useState('');
    const [searchWords, setSearchWords] = useState<string[]>([]);
    const [categories, setCategories] = useState<Record<string, string>>({});
    const [highlightedText, setHighlightedText] = useState<string>('');
    const [wordsByCategory, setWordsByCategory] = useState<Record<string, string[]>>({});
    const [statistics, setStatistics] = useState<Record<string, number>>({})
    const onClick = () => {
        const response = fetch('/rpc/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "process_input_text",
                "params": {"text": text},
                "id": 1
            })
        })
            .then(response => response.json())
            .then(response => {
                const arrWords = []
                const arrCategories: Record<string, string> = {}
                for (const element of response.result) {
                    for (const el of element.analysis) {
                        const category = el.categories
                        const word = el.word
                        arrWords.push(word)
                        arrCategories[word] = category.join('')

                        for (const cat of category) {
                            if (!wordsByCategory[cat]) wordsByCategory[cat] = [];
                            wordsByCategory[cat].push(word);
                        }
                    const loanword_ratio = element.statistics.loanword_ratio
                    const expressive_ratio = element.statistics.expressive_ratio
                    const obscene_ratio = element.statistics.obscene_ratio
                    statistics['loanword_ratio'] = loanword_ratio
                    statistics['expressive_ratio'] = expressive_ratio
                    statistics['obscene_ratio'] = obscene_ratio

                }
            }

        setSearchWords(arrWords);
        setHighlightedText(text);
        setCategories(arrCategories);
        setWordsByCategory(wordsByCategory);
        setStatistics(statistics);
    }
);
}

const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
}

const legend = [
    'заимствование',
    'обсценная лексика',
    'экспрессивная лексика',
    'обсценное заимствование',
    'экспрессивная заимствованная лексика',
    'обсценная экспрессивная лексика'
];

const colorMap: any = {
    'заимствование': 'cornflowerblue',
    'обсценная лексика': 'indianred',
    'экспрессивная лексика': 'yellow',
    'обсценное заимствование': 'violet',
    'экспрессивная заимствованная лексика': 'green',
    'обсценная экспрессивная лексика': 'orange'

};

const categoriesMap: any = {
    'loanword': 'Заимствования: \n',
    'expressive': 'Экспрессивная лексика: \n',
    'obscene': 'Обсценная лексика: \n',

};

const statisticsMap: any = {
    'loanword_ratio': 'Коэффициент заимствований: \n',
    'expressive_ratio': 'Коэффициент экспрессивной лексики: \n',
    'obscene_ratio': 'Коэффициент обсценной лексики: \n',

}


return (
    <Layout className="text-input-output">
        <Space direction="vertical" size={"middle"}>
            <div className="about-on-main">
                <p>Мы рады приветствовать вас на официальном сайте проекта Antidict. Наш проект посвящён
                    автоматическому
                    распознаванию англоязычных заимствований, экспрессивных форм и намеренных искажений (эрративов)
                    в
                    тексте. В основе нашего механизма лежит многоклассовый классификатор, изначально обученный для
                    определения этих типов слов на корпусе ГИКРЯ. Для обучения распознаванию англоязычных
                    заимствований
                    наш классификатор был обучен на словаре Дьякова. Для классификации эрративов и экспрессивных
                    слов
                    нами были собраны отдельные датасеты, на которых классификатор обучался. Эрративы
                    рассматриваются
                    нами как подкласс слов с экспрессивной окраской, которые также включают в себя слова с
                    экспрессивными аффиксами и мат.</p>
                <p>Проект представлен студентами магистратуры школы лингвистики Национального исследовательского
                    университета "Высшая школа экономики". Разработка проекта проходила в 2019-2020 годах. В данный
                    момент над совершенствованием Antidict трудятся 5 человек: Антон Вахранёв, Алексей Доркин, Ирина
                    Дьячкова, Лидия Остякова и Владислава Смирнова. Надеемся, наш проект будет полезен для вас!</p>
            </div>
            <Content className="text-input" style={{textAlign: 'center'}}>
                <TextArea rows={10} style={{width: 600}} value={text} onChange={onChange}/>
            </Content>
            <Content className="button" style={{margin: '0 auto', textAlign: 'center', width: 100}}>
                <Button type="primary" onClick={onClick}>Разобрать</Button>
            </Content>
            <Content className="text-output" style={{textAlign: 'left'}}>
                <Row gutter={24} justify="center">
                    <Col span={15}>
                        <Card style={{width: 600, borderStyle: 'solid', marginLeft: 'auto'}} bordered={true}>
                            <Divider orientation="left">Результат разбора</Divider>
                            <Highlighter
                                highlightClassName="highlightClassName"
                                searchWords={searchWords}
                                autoEscape={true}
                                caseSensitive={false}
                                highlightTag={({children}) => (
                                    <span
                                        className={"highlighted-text color" + categories[children.toString()]}>{children}</span>
                                )}
                                textToHighlight={highlightedText}/>
                        </Card>
                    </Col>
                    <Col span={9}>
                        <Card style={{width: 300, borderStyle: 'solid'}}
                              bordered={true}>
                            <Divider orientation="left">Обозначения</Divider>
                            <List
                                size="small"
                                bordered
                                dataSource={legend}
                                renderItem={item => (
                                    <List.Item>
                                        <div className="legend">
                                            <div className={"indicator " + colorMap[item]}/>
                                            {item}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} justify="center">
                    <Col span={15}>
                        <Card style={{width: 600, borderStyle: 'solid', marginLeft: 'auto'}} bordered={true}>
                            <Divider orientation="left">Списки слов по категориям</Divider>
                            <List
                                size="small"
                                bordered
                                dataSource={Object.entries(wordsByCategory)}
                                renderItem={([item, words]) => (
                                    <List.Item>
                                        <div className="search-words">
                                            {categoriesMap[item]}
                                            {words.join(', ')}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                        </Col>
                    <Col span={9}>
                        <Card style={{width: 300, borderStyle: 'solid'}} bordered={true}>
                            <Divider orientation="left">Статистика</Divider>
                            <List
                                size="small"
                                bordered
                                dataSource={Object.entries(statistics)}
                                renderItem={([item, coefficient]) => (
                                    <List.Item>
                                        <div className="showed-statistics">
                                            {statisticsMap[item]}
                                            {coefficient}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Space>
    </Layout>
);
}
