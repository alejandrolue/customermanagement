import React, {useEffect, useState} from "react"
import { LineChart } from '@mui/x-charts/LineChart';
import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "../../../../config/firebase";
export default function WeightGraph({data}) {
    if (data.length < 6) {
        return <div>Not sufficient Treatments to display graph</div>;
    }

    // Assuming each entry in graphData has 'date' and 'value' properties
    const chartData = data.map((entry, index) => ({
        x: index + 1, // or use entry.date if it is numeric and sorted
        y: entry.weight // Adjust based on your actual data structure
    }));

    return (
        <div className="weightGraph-container">
            <LineChart
                width={500}
                height={300}
                series={[
                    {
                        id: 'series-1',
                        data: chartData.map(d => d.y),
                    },
                ]}
                xAxis={[
                    {
                        id: 'defaultized-x-axis-0',
                        data: chartData.map(d => d.x),
                    },
                ]}
                yAxis={[
                    {
                        id: 'defaultized-y-axis-0',
                    },
                ]}
                area={true}
            />
        </div>
    );
}