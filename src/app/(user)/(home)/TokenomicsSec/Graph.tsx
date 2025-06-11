import { MouseEventHandler } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
    { id: "ten", name: 'Group J', value: 1, },
    { id: "nine", name: 'Group I', value: 2, },
    { id: "eight", name: 'Group H', value: 5, },
    { id: "seven", name: 'Group G', value: 10, },
    { id: "six", name: 'Group F', value: 15, },
    { id: "five", name: 'Group E', value: 3, },
    { id: "four", name: 'Group D', value: 4, },
    { id: "three", name: 'Group C', value: 25, },
    { id: "two", name: 'Group B', value: 30, },
    { id: "one", name: 'Group A', value: 5, },
];
const colors = ['url(#blue)', 'url(#green)', 'url(#orange)', 'url(#bluedark)', 'url(#red)', 'url(#yellow)'];

const Graph = ({ onMouseEnter, onMouseLeave }: { onMouseLeave: () => void, onMouseEnter: MouseEventHandler<SVGPathElement> }) => {
    return (
        <PieChart className='graph_chart' width={478} height={478}>
            <Pie
                data={data}
                cx={234}
                cy={234}
                innerRadius={190}
                outerRadius={239}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
            >
                {data.map((item, index) => (
                    <Cell
                        key={`cell-${index}`}
                        // fill={colors[index % colors.length]}
                        fill={`url(#${item.id})`}
                        className={`gradient`}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        id={`cell-${item.id}`}
                    />
                ))}
            </Pie>
            <defs>
                <linearGradient id="one" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#40596B" />
                </linearGradient>
                <linearGradient id="two" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#0080D0" />
                </linearGradient>
                <linearGradient id="three" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#009060" />
                </linearGradient>
                <linearGradient id="four" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#40596B" />
                </linearGradient>
                <linearGradient id="five" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#F7A62F" />
                </linearGradient>
                <linearGradient id="six" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#C65102" />
                </linearGradient>
                <linearGradient id="seven" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#0080D0" />
                </linearGradient>
                <linearGradient id="eight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#F7A62F" />
                </linearGradient>
                <linearGradient id="nine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#C65102" />
                </linearGradient>
                <linearGradient id="ten" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="#009060" />
                </linearGradient>
            </defs>
        </PieChart>
    );
};

export default Graph;
