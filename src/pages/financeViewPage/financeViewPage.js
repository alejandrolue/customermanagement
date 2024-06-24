import React from "react"
import {LineChart} from "@mui/x-charts/LineChart";
import {Button} from "@mui/material";

export default function FinanceViewPage() {
    return (
        <div className="financeViewPage">
            <div>
                <h3>Total revenue this year: not enough data yet</h3>
                <LineChart
                    xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
            <div>
                <h3>Total revenue this month: not enough data yet </h3>
                <LineChart
                    xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
                    series={[
                        {
                            data: [1, 200, 300, 400, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
            <Button>DOWNLOAD CSV</Button>
        </div>
    )
}