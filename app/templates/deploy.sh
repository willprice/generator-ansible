#!/usr/bin/env bash

ANSIBLE_PLAYBOOK="${ANSIBLE_PLAYBOOK:-ansible-playbook}"
PLAYBOOK="${PLAYBOOK:-site.yml}"
INVENTORY_FILE="${INVENTORY_FILE:-inventory}"

"$ANSIBLE_PLAYBOOK" --inventory-file="$INVENTORY_FILE" \
                    --ask-become-pass \
                    "$PLAYBOOK"
