import { Helmet } from "react-helmet"

function NoPage() {
    return (
        <>
            <Helmet>
                <title>Page non trouvée - Chaudron</title>
            </Helmet>
            <div className="container"> 404 - Page non trouvée</div>
        </>
    )
}

export default NoPage