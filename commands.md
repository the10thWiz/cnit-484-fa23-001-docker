# Commands

domain name: *.cnit484fa23grp1.com

## As Root

$ apt install doas
$ echo "permit persist :wheel" > /etc/doas.conf
$ groupadd -U matt wheel

## As matt

Add the following to /etc/network/interfaces

```conf
iface ens33 inet static
  address 192.168.105.8
  netmask 255.255.255.224
  gateway 192.168.105.1
```

$ echo "nameserver 192.168.105.5\nnameserver 192.168.105.6" > /etc/resolv.conf
$ doas apt install docker docker-compose
$ doas usermod -aG docker matt

## Tools for testing

$ doas apt install netcat nmap termshark net-tools
