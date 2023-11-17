import logo from "../public/ChaudronHorizontalLogo.png"

function Header() {
    return (
        <>
            <div className="navbar bg-base-100">
                <img src={logo} height="170" width="170"/>
                <a className="btn btn-ghost normal-case text-xl">recettes</a>
            </div>
        </>
    )
}

export default Header