import React, { useState } from "react";
import styles from './Pagination.module.css';

const Pagination = props => {
    const [pages] = useState(Math.floor(props.data.length / 10) + 1)
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.innerText);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * 10 - 10;
        const endIndex = startIndex + 10;
        return [props.data[0],props.data[1]];
    };

    const getPaginationGroup = () => {
        if (currentPage <= 6) {
            return new Array(10).fill().map((_, index) => index + 1)
        } else if (currentPage >= (props.data.length / 10) - 4) {
            return new Array(10).fill(Math.floor(props.data.length / 10) - 4).map((element, index) => element - (4 - index))
        } else {
            return new Array(10).fill(currentPage - 5).map((element, index) => element + index)
        }
    };

    return (
        <div>
            <div className="header-box">
                <div className="box">
                    {`Games : ${props.data.length}`}
                </div>
            </div>

            <div className={styles.pagination}>

                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`${styles.prev} ${currentPage === 1 ? styles.disabled : ''}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}
                    >
                        <span id={item}>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`${styles.next} ${currentPage === pages ? styles.disabled : ''}`}
                >
                    next
                </button>
            </div>

            <div className="dataContainer">
                <div className="dataheaderbox">
                    <div className="info">
                        Game #
                    </div>
                    <div className="info">
                        Teams
                    </div>
                    <div className="info">
                        Result
                    </div>
                </div>
                {/* getPaginatedData().map((data, index) => (
                    <div key={index} className="databox">
                        <div className="info">
                            {`Game `}<span className="num">{`${(currentPage - 1) * 10 + index + 1}`}</span>
                        </div>
                        <div className="info">
                            
                            {data[0]}
                            
                        </div>
                        <div className="info">
                            
                            {data[1]}
                        </div>
                    </div>
                )) */}
                {props.data[0].map((data, index) => (
                    <div key={index}>{data}</div>
                ))}
            </div>

        </div>
    )
}

export default Pagination;