import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {saveQuizCount} from '../utils/api.js';
import {setLocalNotification,clearLocalNotification} from "../utils/helper.js";


const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        width: 300,
        height: 100,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: '#ebebeb',
        marginTop: 100,
        marginBottom: 100,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ebebeb',
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    question: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },

    score: {
        fontSize: 35,
        color: '#000000',
        fontWeight: 'bold'
    },

    titleContainer: {
        marginBottom: 20,
    },

    scoreContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    buttonContainer: {
        marginTop: 20,
        padding: 20
    }

});



export default class QuizComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deckId: 0,
            questions: [],
            totalQuestions: 0,
            questionIndex: 0,
            currentQuestion: {},
            score: 0,
            quizEnd: false,
            showAnswer: false
        }
    }

    componentDidMount() {

        const { params } = this.props.navigation.state;
        const questions = params ? params.questions : null;
        const deckId = params ? params.deckId : null;
        currentQuestion = questions[this.state.questionIndex];
        this.setState({ deckId: deckId, questions: questions, currentQuestion: currentQuestion, totalQuestions: questions.length });


    }

    restartQuiz() {
        this.setState({
            questionIndex: 0,
            currentQuestion: this.state.questions[0],
            score: 0,
            quizEnd: false
        })
    }

    backToDeck() {
        this.props.navigation.navigate('DeckComponent', { id: this.state.deckId });
    }

    answer(answer) {
        
        score = this.state.score;

        //answer matched, increment score
        if (answer === this.state.currentQuestion.answer) {
            score = score + 1;
        }

        var nextIndex = this.state.questionIndex + 1;


        if (nextIndex === this.state.questions.length) {
            //final question reached
            saveQuizCount();

            clearLocalNotification().then(()=>{
                setLocalNotification();
            });

            this.setState({ score: score, quizEnd: true });

        } else {
            var nextQuestion = this.state.questions[nextIndex];
            console.log("Next Question:", nextQuestion);
            this.setState({ questionIndex: nextIndex, currentQuestion: nextQuestion, score: score });
        }


    }

    showAnswer() {

        this.setState({ showAnswer: true });

    }

    backToQuiz(){
        this.setState({ showAnswer: false });
    }

    render() {

        var q = this.state.currentQuestion;

        if (this.state.showAnswer) {
            
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.titleContainer} >
                            <Text style={styles.question}>Show Answer</Text>
                        </View>
                        <View>
                        <Text style={styles.question}>{this.state.currentQuestion.question}</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.score}>{this.state.currentQuestion.answer}</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Button
                                onPress={() => this.backToQuiz()}
                                title="Back To Quiz"
                                color="black"
                                accessibilityLabel="Back To Quiz"
                            />
                        </View>
                    </View>
                </View>
            );
        }



        if (this.state.quizEnd) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.titleContainer} >
                            <Text style={styles.question}>Yay! quiz completed!Your score is...</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.score}>{this.state.score} out of {this.state.totalQuestions}</Text>
                        </View>
                        <View style={styles.buttonContainer}>


                            <Button
                                onPress={() => this.restartQuiz()}
                                title="Restart Quiz"
                                color="black"
                                accessibilityLabel="Restart Quiz"
                            />
                            <Button
                                onPress={() => this.backToDeck()}
                                title="Back To Deck"
                                color="black"
                                style={{marginTop:5}}
                                accessibilityLabel="Back To Deck"
                            />
                        </View>
                    </View>
                </View>
            )
        }

        var questionNo = this.state.questionIndex + 1;

        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.titleContainer} >
                        <Text style={styles.question}>Question {questionNo} / {this.state.totalQuestions} </Text>
                    </View>
                    <View>
                        <Text style={styles.question}>{q.question}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => this.answer('Yes')}
                            title="Correct"
                            color="green"
                            accessibilityLabel="Correct"
                        />
                        <Button
                            onPress={() => this.answer('No')}
                            title="Incorrect"
                            color="red"
                            style={{marginTop:5}}
                            accessibilityLabel="Incorrect"
                        />

                        <Button
                            onPress={() => this.showAnswer()}
                            title="Show Answer"
                            color="black"
                            style={{marginTop:5}}
                            accessibilityLabel="Show Answer"
                        />
                    </View>
                </View>
            </View>
        );
    }

}