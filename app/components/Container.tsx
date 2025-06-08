import React from "react";

type IContainerProps = {
    fluid?: boolean
} & React.HTMLAttributes<HTMLDivElement>;


const Container: React.FC<IContainerProps> = ({fluid, className, children, ...props}) => {
    return (
        <div className={`container ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Container;