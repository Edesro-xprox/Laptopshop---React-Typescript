import { Laptop, Monitor, Smartphone, Tablet } from 'lucide-react';

function Navbar() {
    const navLinkStyle = {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '4px'
    };

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = '#ff7a00';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.transform = 'scale(1.05)';
    };

    const handleHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <div className='w-100 d-flex text-white p-3' style={{ gap: "5%", backgroundColor: "#474747" }}>
            <a 
                className="d-flex align-items-center text-white text-decoration-none" 
                href="#"
                style={navLinkStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
            >
                <Laptop size={20}/> <span style={{ marginLeft: "5px"  }}>Laptops</span>
            </a>
            <a 
                className="d-flex align-items-center text-white text-decoration-none" 
                href="#"
                style={navLinkStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
            >
                <Smartphone size={20} /> <span style={{ marginLeft: "5px"  }}>Celulares</span>
            </a>
            <a 
                className="d-flex align-items-center text-white text-decoration-none" 
                href="#"
                style={navLinkStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
            >
                <Tablet size={20} /> <span style={{ marginLeft: "5px"  }}>Tablets</span>
            </a>
            <a 
                className="d-flex align-items-center text-white text-decoration-none" 
                href="#"
                style={navLinkStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
            >
                <Monitor size={20} /> <span style={{ marginLeft: "5px"  }}>Computadoras</span>
            </a>
        </div>
    )
}

export default Navbar;
