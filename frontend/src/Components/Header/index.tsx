import React from 'react';
import HeaderStyle from './styles';

const Header: React.FC = () => {

    return(
        <>
            <HeaderStyle>
                <table>
                    <tbody>
                        <tr>
                            <td className='title'>Período Profissiográfico Profissional</td>
                        </tr>
                    </tbody>
                </table>   
            </HeaderStyle>
        </>
    )

}

export default Header;