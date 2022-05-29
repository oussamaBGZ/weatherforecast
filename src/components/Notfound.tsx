import React from 'react'

function Notfound() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={require('../icons/notfound.jpg')} style={{ width: 500 }} />
        </div>
    )
}

export default Notfound