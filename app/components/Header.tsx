import logoUrl from '../images/logo.svg'

const Header: React.FC = () => {
    return (
        <header className="header">
            <img src={logoUrl} width={40} height={40} alt="React Quiz System Logo" />
            <h1 className="text-2xl font-bold">
                React Quiz System
            </h1>
        </header>
    )
}

export default Header;