const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    console.log(error)

    error.message = err.message

    if(err.name === 'CastError') {
        return res.status(404).json({ error: 'Sellise id-ega tulemust ei leitud' });
    }

    if(err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Kõik väljad peavad olema täidetud' });
    }

    res.status(err.satusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}

module.exports = errorHandler;