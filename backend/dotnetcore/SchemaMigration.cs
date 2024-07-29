using System;
using System.Collections.Generic;

namespace TodoServer;

public partial class SchemaMigration
{
    public long Version { get; set; }

    public bool Dirty { get; set; }
}
