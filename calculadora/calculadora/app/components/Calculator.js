"use client";

import { useState } from 'react';
import Button from './Button';
import Display from './Display';
import styles from '../styles/Calculator.module.css';
import HistoryPanel from "@/app/components/HistoryPanel";

export default function Calculator() {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    const operadores = ['+', '-', '*', '/', '%'];

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    const handleHistorySelect = (item) => {
        setExpression(item.expression);
        setResult(item.result);
        setShowHistory(false);
        setIsResultDisplayed(true);
    };


    const handleClick = (value) => {

        if (value === 'C') {
            setExpression('');
            setResult('');
            setIsResultDisplayed(false);
            return;
        }

        if (value === '⌫') {
            setExpression(expression.slice(0, -1));
            return;
        }

        if (value === '=') {
            try {
                let expr = expression;
                expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
                const evalResult = eval(expr);

                setResult(evalResult);
                setIsResultDisplayed(true);

                setHistory(prev => [...prev, { expression, result: evalResult }]);

            } catch {
                setResult('Erro');
                setIsResultDisplayed(true);
            }
            return;
        }


        if (value === '%') {
            const lastChar = expression.slice(-1);
            if (/\d/.test(lastChar)) {
                setExpression(expression + '%');
            }
            return;
        }

        if (value === '+/-') {
            const match = expression.match(/(-?\d+\.?\d*)$/);
            if (match) {
                const num = match[0];
                const start = match.index;
                const inverted = num.startsWith('-') ? num.slice(1) : '-' + num;
                setExpression(expression.slice(0, start) + inverted);
            }
            return;
        }

        if (operadores.includes(value)) {

            if (isResultDisplayed) {
                setExpression(result + value);
                setResult('');
                setIsResultDisplayed(false);
                return;
            }

            const lastChar = expression.slice(-1);
            if (operadores.includes(lastChar) && lastChar !== "%") {
                setExpression(expression.slice(0, -1) + value);
            } else if (expression !== '') {
                setExpression(expression + value);
            }
            return;
        }

        if (isResultDisplayed) {
            setExpression(value);
            setResult('');
            setIsResultDisplayed(false);
        } else {
            setExpression(expression + value);
        }
    };

    const buttons = [
        'C', '⌫', '%', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '+/-', '0', '.', '=',
    ];

    return (
        <div className={styles.calculator}>
            <Display
                expression={expression}
                result={result}
                onToggleHistory={toggleHistory}
            />

            {showHistory && (
                <HistoryPanel
                    history={history}
                    onSelect={handleHistorySelect}
                    onClose={() => setShowHistory(false)}
                />
            )}

            <div className={styles.grid}>
                {buttons.map((btn, idx) => (
                    <Button key={idx} value={btn} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
}
