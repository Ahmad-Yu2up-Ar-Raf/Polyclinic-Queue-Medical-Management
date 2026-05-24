<?php

namespace App\Enums;

enum RoleEnum: string
{
    //
    case ADMIN = "admin";
    case OPERATOR = "operator";
    case DOKTER = "dokter";
    case PASIEN = "pasien";
}
