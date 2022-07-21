import React from 'react'
import {
    Card,
    CardContent,
    Typography
} from "@mui/material"

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className="infoBox_title" color="testSecondary">
                    {title}
                </Typography>

                {/* No of cases */}
                <h2 className="infoBox_cases">{cases}</h2>

                {/* Total */}
                <Typography className="infoBox_total" color="testSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
