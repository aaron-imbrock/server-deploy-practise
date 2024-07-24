'use strict';

const os = require('os');

function getSystemIPs() {
    const networkInterfaces = os.networkInterfaces();
    const ips = [];

    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];

        interfaces.forEach((iface) => {
            if (iface.family === 'IPv4' && !iface.internal) {
                ips.push({
                    name: interfaceName,
                    address: iface.address,
                });
            }
        });
    }

    return ips;
}

module.exports = getSystemIPs;