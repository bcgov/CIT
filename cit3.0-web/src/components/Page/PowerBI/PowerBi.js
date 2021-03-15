import { useState, useEffect } from 'react';
import axios from 'axios';
import "./PowerBi.css"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

export default function PowerBi(props) {

    const [reportConfig, setReportConfig] = useState({});
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        axios.get("/api/reports/getembedinfo")
            .then(res => {
                //console.log(res.data)
                setReportConfig(res.data);
            })
            .catch(err => console.error(err));
    }, [])

    //console.log(reportConfig.embedToken);

    return (
        reportConfig.embedToken ?

        <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: reportConfig.embedReports[0].id,
                    embedUrl: reportConfig.embedReports[0].embedUrl,
                    accessToken:  reportConfig.embedToken,
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: {
                                visible: false
                            },
                            pageNavigation: {
                                visible: true
                            }
                        },
                    }
                }}

                // Define event handlers
                eventHandlers={
                    new Map([
                        ['loaded', function () { console.log('Report loaded'); }],
                        ['rendered', function () { console.log('Report rendered'); }],
                        ['error', function (event) { console.log(event.detail); }],
                        ['pageChanged', function (event) {
                            // Municipalities
                            // Crown Tenure
                            // Q & A
                            const pageName = event.detail.newPage.displayName;
                            //console.log(event.detail);
                            //console.log(pageName);
                            setCurrentPage(event.detail.newPage.displayName);
                         }]
                        
                    ])}

                // Add CSS classes to the div element
                cssClassName={"report-style-class"} /> 
                : null
    )
}
