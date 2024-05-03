import PropTypes from 'prop-types';

SessionTabButton.propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
};

export default function SessionTabButton({ text, active, ...rest }) {
    const activeClasses = "bg-[#F9F4F1] text-[#26283F]";
    const inactiveClasses = "bg-[#26283F] hover:bg-[#3D4058] text-white";

    const baseClasses = 'px-2 py-1 rounded-md text-left flex flex-col gap-2 transition duration-150';
    const appliedClasses = active ? activeClasses : inactiveClasses;
    
    return <button
        className={`${baseClasses} ${appliedClasses}`}
        {...rest}
    >
        {text}
    </button>;
}