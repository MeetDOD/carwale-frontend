import "./loading.css";

const Loading = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row d-flex justify-content-cent align-items-center vh-100">
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;