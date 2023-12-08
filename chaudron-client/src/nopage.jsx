import { Helmet } from "react-helmet"

function NoPage() {
    return (
        <>
            <Helmet>
                <title>Page inexistante - Chaudron</title>
            </Helmet>
            <div className="container"> 404 - Page non trouvée</div>
        </>
    )
}

export default NoPage