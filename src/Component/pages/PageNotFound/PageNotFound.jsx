import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-not-found">
            <div className="containers">
                <div className="error-content">
                    <div className="error-number">404</div>

                    <div className="error-text">
                        <h1>Oops! Page Not Found</h1>
                        <p>
                            The page you're looking for seems to have wandered off.
                            Don't worry, it happens to the best of us!
                        </p>
                    </div>

                    <div className="error-illustration">
                        <div className="sad-face">
                            <div className="eyes">
                                <div className="eye"></div>
                                <div className="eye"></div>
                            </div>
                            <div className="mouth"></div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn btn-primarys"
                            onClick={() => window.history.back()}
                        >
                            <span>← Go Back</span>
                        </button>

                        <button
                            className="btn btn-secondarys"
                            onClick={() => window.location.href = '/'}
                        >
                            <span>🏠 Home Page</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;