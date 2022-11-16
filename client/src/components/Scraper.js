import React, { useState, useEffect } from "react";

const Scraper = props => {
    const [winner, setWinner] = useState([])
    const [team, setTeam] = useState([])
    
    const [scraped, setScraped] = useState(false)
    const [load, setLoad] = useState("")
    var newArr = [[]];

    useEffect(() => {
        console.log(props.url)
        
        fetch(`https://vercel-webscraping-server-znmind.vercel.app/`)
            .then(res => res.json())
            .then(body => console.log(body))
    }, [])

    const getScrape = () => {
        setLoad("Loading...")
        setScraped(false)
        fetch(`https://vercel-webscraping-server-znmind.vercel.app/scrape?value=${props.url}&value=.Table tbody tr .teams__col a`)
            .then(res => res.json())
            .then(body => {
                setWinner(body.data)
                return body.data;
            })
            .then(() => {
                fetch(`https://vercel-webscraping-server-znmind.vercel.app/scrape?value=${props.url}&value=.Table tbody tr td .Table__Team`)
                    .then(res => res.json())
                    .then(body => {
                        setTeam(body.data)
                        setScraped(true)
                        for (let i = 0; i < body.data.length / 2; i++) {
                            newArr[i] = `${team[i * 2]} - ${team[i * 2 + 1]}`;
                        }
                        return newArr;
                    })
            })
            .catch(err => {
                setLoad("Try Again")
                console.log(err)
            })
    }

    for (let i = 0; i < winner.length; i++) {
        newArr[i] = `${team[i * 2]} - ${team[i * 2 + 1]}`;
    }

    const Button = ({ text, onClick, className }) => {
        return <button onClick={onClick} className={className}>{text}</button>
    }

    return (
        <div>
            <div>
                <Button
                    text="Scrape"
                    onClick={getScrape}
                    className="btn btn-primary"
                />
            </div>
            <div className="h-container">
                <div className="column">
                    Game #
                </div>
                <div className="column">
                    Teams
                </div>
                <div className="column">
                    Result
                </div>
            </div>
            <div className="c-container">
                <div>
                    {scraped
                        ? newArr.map((data, index) => (
                            <div className="c-container">
                                <div key={index + newArr.length}className="column">{`${index + 1}`}</div>
                                <div key={index} className="column">{data}</div>
                            </div>
                        ))
                        : load}
                </div>
                <div className="column">
                    {scraped
                        ? winner.map((data, index) => (
                            <div key={index}>{data}</div>
                        ))
                        : ""}
                </div>
            </div>
        </div>
    )
}

export default Scraper;